import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface EmailModel{
  recipientEmail : string;
  subject : string;
  body : string;
}

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  private apiUrl = `${environment.apiBaseUrl}/Email/SendEmail/send-email`;


  constructor(private http: HttpClient) { }

  sendEmail(data: EmailModel): Observable<JSON> {
    return this.http.post<JSON>(this.apiUrl, data);
  }

}
