interface TelegramMessage {
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

export async function sendTelegramMessage(message: TelegramMessage): Promise<boolean> {
  const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram credentials not configured');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...message, chat_id: chatId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Telegram send error:', error);
    return false;
  }
}

export function formatContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
}): string {
  return `
<b>📩 Nuevo contacto desde la web</b>

<b>Nombre:</b> ${data.name}
<b>Email:</b> ${data.email}
${data.phone ? `<b>Teléfono:</b> ${data.phone}` : ''}
${data.interest ? `<b>Interés:</b> ${data.interest}` : ''}
<b>Mensaje:</b>
${data.message}
  `.trim();
}
