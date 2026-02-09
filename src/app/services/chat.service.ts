
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly baseUrl = 'http://localhost:8765/pdf-chatbot-service/chat-with-jarvis'
  // private readonly baseUrl = 'http://localhost:8001/api/ai/chat'
  constructor(private ngZone: NgZone, private httpClient: HttpClient) { }
  nonStreamAnswer(question: String): Observable<String>{
    const payload = {"prompt": question}
    return this.httpClient.post<String>(`${this.baseUrl}`,payload)
  }
/* 
  streamAnswer(question: string): Observable<string> {
    return new Observable(observer => {
      const eventSource = new EventSource(`${this.baseUrl}?prompt=${encodeURIComponent(question)}`);

      eventSource.onmessage = (event) => {

        const raw = event.data?.trim();

        if (!raw) return;

        this.ngZone.run(() => {

          try {
            console.log('SSE raw data:', raw);
            const data = JSON.parse(raw.trim());
            if (data.response) {
              observer.next(data.response);
            }
            if (data.done) {
              observer.complete();
              eventSource.close();
            }
          } catch (error) {
            console.error('Error parsing SSE data:', error);

          }
        });
      };

      eventSource.onerror = () => {
        eventSource.close();
      }

      return () => {
        eventSource.close();
      }

    }); */

  
}
