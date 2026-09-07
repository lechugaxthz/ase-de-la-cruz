import type { APIRoute } from 'astro';
import { sendTelegramMessage, buildInsuranceMessage } from '../../lib/telegram';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value.toString();
    }

    // Validate required fields
    const requiredFields = ['nombre', 'telefono', 'interesPrincipal'];
    for (const field of requiredFields) {
      if (!data[field]?.trim()) {
        return new Response(JSON.stringify({ success: false, error: `Campo requerido: ${field}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Validate phone format (basic)
    if (!/^[\d\s\+\-\(\)]{10,}$/.test(data.telefono)) {
      return new Response(JSON.stringify({ success: false, error: 'Formato de teléfono inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email if provided
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return new Response(JSON.stringify({ success: false, error: 'Email inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build message
    const message = buildInsuranceMessage(data as any);

    // Send to Telegram
    const success = await sendTelegramMessage(message, {
      botToken: import.meta.env.TELEGRAM_BOT_TOKEN || '',
      chatId: import.meta.env.TELEGRAM_CHAT_ID || '',
      apiUrl: 'https://api.telegram.org/bot',
    });

    if (success) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Error al enviar el mensaje' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};