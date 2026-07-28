import { Injectable } from '@angular/core'; // <-- Importación correcta
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // <-- Decorador correcto en Angular
})
export class Telegram {
  private botToken: string;
  private chatId: string;
  private apiUrl: string;

  constructor() {
    this.botToken = environment.telegramBotToken;
    this.chatId = environment.telegramChatId;
    this.apiUrl = environment.telegramUrl;
  }

  async enviarMensaje(mensaje: string): Promise<boolean> {
    const url = this.apiUrl + this.botToken + "/sendMessage";

    try {
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: mensaje,
          parse_mode: 'Markdown',
        }),
      });

      return respuesta.ok;
    } catch (error) {
      console.error('Error de red al conectar con Telegram:', error);
      return false;
    }
  }
}
