import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/chat.service';

interface Message {
  sender: 'user' | 'Jarvis';
  text: string;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false
})
export class ChatComponent {

  file?: File;
  question = '';
  messages: Message[] = [];
  loading = false;
  answer = '';

  constructor(
    private chatService: ChatService,
    private router: Router
  ) { }

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  askQuestion() {
    if (!this.question.trim()) return;
    this.messages.push({
      sender: 'user',
      text: this.question
    });
    const botMessage = { sender: 'Jarvis' as const, text: '' };
    this.messages.push(botMessage);
    this.loading = true;
    this.chatService.streamAnswer(this.question)
      .subscribe({
        next: (word) => {
          botMessage.text += word;
          this.question = '';
        },
        complete: () => {
          this.loading = false;
          this.question = '';
        },
        error: (err) => {
          botMessage.text += ' Sorry, an error occurred while processing your request.------';
          console.error('Error occurred while asking question:', err);
          this.loading = false;
        }

      });
  }
}
