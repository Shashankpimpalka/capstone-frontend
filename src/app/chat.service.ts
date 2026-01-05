
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly baseUrl = 'http://localhost:8765/global-station-movie-service/api/v0/ask'

  constructor(private ngZone: NgZone) { }

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

    });
  }
}
