
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { pdfChat } from '../pdfChat';    
import { QuestionOnPdf } from '../QuestionOnPdf';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly baseUrl = 'http://localhost:8765/pdf-chatbot-service/'
  // private readonly baseUrl = 'http://localhost:8001/api/ai/chat'
  constructor(private ngZone: NgZone, private httpClient: HttpClient) { }
  nonStreamAnswer(question: string): Observable<string>{
    const payload = {"prompt": question}
    return this.httpClient.post<string>(`${this.baseUrl}chat-with-jarvis`,payload)
  }
  uploadPdf(formData: FormData): Observable<string>{
    return this.httpClient.post<string>(`${this.baseUrl}upload-pdf`,formData)
  }
  chatWithPdf(prompt: QuestionOnPdf): Observable<pdfChat>{
    return this.httpClient.post<pdfChat>(`${this.baseUrl}ask`,prompt)
  }
  clearDatabase(): Observable<string>{
    return this.httpClient.delete<string>(`${this.baseUrl}clear-database`)
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
