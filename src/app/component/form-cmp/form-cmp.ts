import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // <-- Agregamos NgForm
import { Telegram } from '../../service/telegram';

@Component({
  selector: 'app-form-cmp',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-cmp.html',
  styleUrl: './form-cmp.css',
})
export class FormCmp {
  private telegramService = inject(Telegram);

  interesPrincipal: 'vida/prepaga' | 'hogar' | 'vehicular' | 'empresas' | 'otros' = 'vida/prepaga';

  datos = {
    nombre: '',
    email: '',
    telefono: '',
    comentarios: '',
    tipoCobertura: 'soltero',
    dni: '',
    ubicacion: '',
    marca: '',
    modelo: '',
    anio: '',
    cuit: '',
  };

  enviando = false;
  mensajeExito = false;

  seleccionarInteres(interes: 'vida/prepaga' | 'hogar' | 'vehicular' | 'empresas' | 'otros') {
    this.interesPrincipal = interes;
  }

  // Recibimos el formulario del HTML
  async enviarFormulario(formulario: NgForm) {
    // Si el formulario es inválido, cortamos la ejecución por seguridad
    if (formulario.invalid) return;

    this.enviando = true;

    let mensaje = `🚨 *NUEVA SOLICITUD DE ASESORÍA* 🚨\n\n`;
    mensaje += `*Interés:* ${this.interesPrincipal.toUpperCase()}\n`;

    if (this.datos.nombre) mensaje += `*Nombre:* ${this.datos.nombre}\n`;
    if (this.datos.email) mensaje += `*Email:* ${this.datos.email}\n`;
    if (this.datos.telefono) mensaje += `*Teléfono:* ${this.datos.telefono}\n\n`;

    if (this.interesPrincipal === 'vida/prepaga') {
      mensaje += `*Tipo de Cobertura:* ${this.datos.tipoCobertura}\n`;
      if (this.datos.dni) mensaje += `*DNI:* ${this.datos.dni}\n`;
    } else if (this.interesPrincipal === 'hogar') {
      if (this.datos.dni) mensaje += `*DNI:* ${this.datos.dni}\n`;
      if (this.datos.ubicacion) mensaje += `*Ubicación:* ${this.datos.ubicacion}\n`;
    } else if (this.interesPrincipal === 'vehicular') {
      if (this.datos.marca) mensaje += `*Marca:* ${this.datos.marca}\n`;
      if (this.datos.modelo) mensaje += `*Modelo:* ${this.datos.modelo}\n`;
      if (this.datos.anio) mensaje += `*Año:* ${this.datos.anio}\n`;
    } else if (this.interesPrincipal === 'empresas') {
      if (this.datos.cuit) mensaje += `*CUIT:* ${this.datos.cuit}\n`;
    }

    if (this.datos.comentarios) {
      mensaje += `\n*Comentarios:*\n${this.datos.comentarios}\n`;
    }

    try {
      const exito = await this.telegramService.enviarMensaje(mensaje);

      if (exito) {
        this.mensajeExito = true;
        // Reinicia el estado interno (errores, touched) del formulario
        formulario.resetForm();
        // Reinicia nuestras variables
        this.limpiarFormulario();
      } else {
        alert('Hubo un problema al enviar el mensaje. Puedes encontrar el contacto de nuestros asesores mas abajo.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.enviando = false;
      setTimeout(() => (this.mensajeExito = false), 5000);
    }
  }

  limpiarFormulario() {
    this.datos = {
      nombre: '',
      email: '',
      telefono: '',
      comentarios: '',
      tipoCobertura: 'soltero',
      dni: '',
      ubicacion: '',
      marca: '',
      modelo: '',
      anio: '',
      cuit: '',
    };
  }
}
