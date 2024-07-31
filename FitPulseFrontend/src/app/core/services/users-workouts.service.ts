import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersWorkoutsService {
  private apiUrl = `${environment.apiBaseUrl}/UserWorkouts`;

  constructor(private http: HttpClient) { }

  getUserWorkouts(userEmail: string): Observable<any[]> {
    const params = new HttpParams().set('userEmail', userEmail);
    return this.http.get<any[]>(`${this.apiUrl}/GetUserWorkoutsAll`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
