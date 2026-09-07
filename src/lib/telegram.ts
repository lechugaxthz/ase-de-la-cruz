import type { InterestType } from './constants';

interface TelegramConfig {
  botToken: string;
  chatId: string;
  apiUrl: string;
}

interface FormData {
  interesPrincipal: InterestType;
  nombre: string;
  email: string;
  telefono: string;
  comentarios: string;
  tipoCobertura?: string;
  dni?: string;
  ubicacion?: string;
  marca?: string;
  modelo?: string;
  anio?: string;
  cuit?: string;
}

export function buildInsuranceMessage(data: FormData): string {
  let msg = `🚨 *NUEVA SOLICITUD DE ASESORÍA* 🚨\n\n`;
  msg += `*Interés:* ${data.interesPrincipal.toUpperCase()}\n`;
  msg += `*Nombre:* ${data.nombre}\n`;
  if (data.email) msg += `*Email:* ${data.email}\n`;
  msg += `*Teléfono:* ${data.telefono}\n\n`;

  const interestFields: Record<InterestType, string[]> = {
    'vida/prepaga': ['tipoCobertura', 'dni'],
    'hogar': ['dni', 'ubicacion'],
    'vehicular': ['marca', 'modelo', 'anio'],
    'empresas': ['cuit'],
    'otros': [],
  };

  const fieldLabels: Record<string, string> = {
    tipoCobertura: 'Tipo de Cobertura',
    dni: 'DNI',
    ubicacion: 'Ubicación',
    marca: 'Marca',
    modelo: 'Modelo',
    anio: 'Año',
    cuit: 'CUIT',
  };

  const fields = interestFields[data.interesPrincipal];
  fields.forEach(field => {
    const value = data[field as keyof FormData];
    if (value) msg += `*${fieldLabels[field] || field}:* ${value}\n`;
  });

  if (data.comentarios) {
    msg += `\n*Comentarios:*\n${data.comentarios}\n`;
  }

  return msg;
}

export async function sendTelegramMessage(message: string, config: TelegramConfig): Promise<boolean> {
  const url = `${config.apiUrl}${config.botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Telegram error:', error);
    return false;
  }
}