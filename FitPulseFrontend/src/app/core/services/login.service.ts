import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface UserCredentials {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  height?: number;
  weight?: number;
  createdAt?: string;
  lastUpdatedAt?: string;
}

interface User {
  username: string;
  email: string;
  role: string;
  jwtToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiBaseUrl}/Authentication`;

  constructor(private http: HttpClient) { }

  login(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/LoginUser`, credentials);
  }

  register(credentials: UserCredentials): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/register`, credentials);
  }
}
