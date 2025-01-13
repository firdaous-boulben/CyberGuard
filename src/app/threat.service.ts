import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreatService {

  private apiUrl = 'http://localhost:5001/test_ip';  // Flask API endpoint

  constructor(private http: HttpClient) {}

  submitIp(ipAddress: string): Observable<any> {
    return this.http.post(this.apiUrl, { ip_address: ipAddress });
  }
}
