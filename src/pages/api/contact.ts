import type { APIRoute } from 'astro';
import { sendTelegramMessage, formatContactMessage } from '../../lib/telegram';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const nombre = formData.get('nombre')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const telefono = formData.get('telefono')?.toString().trim();
    const interes = formData.get('interes')?.toString().trim();
    const mensaje = formData.get('mensaje')?.toString().trim();
    const privacidad = formData.get('privacidad');

    // Validación básica
    if (!nombre || !email || !mensaje || !privacidad) {
      return new Response(
        JSON.stringify({ success: false, message: 'Faltan campos obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Preparar mensaje para Telegram
    const telegramMessage = formatContactMessage({
      name: nombre,
      email,
      phone: telefono || undefined,
      interest: interes || undefined,
      message: mensaje,
    });

    // Enviar a Telegram
    const sent = await sendTelegramMessage({
      text: telegramMessage,
      parse_mode: 'HTML',
    });

    if (!sent) {
      console.warn('Telegram no configurado o falló el envío, pero el formulario se procesó');
    }

    // Log para debugging
    console.log('Nuevo contacto:', { nombre, email, telefono, interes, timestamp: new Date().toISOString() });

    return new Response(
      JSON.stringify({ success: true, message: 'Formulario enviado correctamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en API contact:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
