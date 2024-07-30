import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkInitialLoginState();
  }

  checkInitialLoginState() {
    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role');
    if (token) {
      this.loggedIn.next(true);
      if (role === 'admin') {
        this.isAdmin.next(true);
      }
    }
  }

  login(token: string, role: string, email: string) {
    localStorage.setItem('jwt', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    this.loggedIn.next(true);
    this.isAdmin.next(role === 'admin');
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    this.isAdmin.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAdminOn(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }
}

