import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) {}

  // Method to send a message and get a response from the Flask API
  getBotResponse(userMessage: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/ask', { question: userMessage });
  }
}
