import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {
  private apiUrl = `${environment.apiBaseUrl}/UserStatistics`;

  constructor(private http: HttpClient) { }

 
  getStatisticsByEmail(email: string): Observable<any> {
    const params = new HttpParams().set('userEmail', email);
    return this.http.get<any>(`${this.apiUrl}/GetUserStatistics`, { params })
      .pipe(
        tap(data => console.log('Fetched statistics:', data)), 
        catchError(this.handleError)
      );
  }


  addStatistics(statistics: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddUserStatistics`, statistics)
      .pipe(
        tap(response => console.log('Added statistics:', response)), 
        catchError(this.handleError) 
      );
  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
