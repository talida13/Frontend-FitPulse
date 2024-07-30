import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import {catchError, tap } from 'rxjs/operators';

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

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  createdAt: string;
  lastUpdatedAt: string;
  email: string;
  role: string;
  jwtToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiBaseUrl}/Authentication`;

  constructor(private http: HttpClient, private authService: AuthService) { }


  login(credentials: UserCredentials): Observable<User> {
    console.log("Inceput login: ",credentials);
    return this.http.post<User>(`${this.apiUrl}/LoginUser`, credentials)

    

    .pipe(
      tap(user => {
        console.log("tap: ",user);
        this.authService.login(user.jwtToken || '', user.role || '', user.email);
      }),
      catchError(err => {
          console.error("EROARE",err);
          return throwError(err);
      })
    );
  }

  register(credentials: UserCredentials): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/RegisterUser`, credentials);
  }
  getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/GetUser`, { params:{ email: email.toString() } });
  }
}



