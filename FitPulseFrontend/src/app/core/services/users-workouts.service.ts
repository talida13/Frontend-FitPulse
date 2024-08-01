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

  addUserWorkout(userEmail: string, workoutId: number, startTime: string, endTime: string, date: string): Observable<any> {
    const body = {
      user_email: userEmail,
      workout_id: workoutId,
      start_time: startTime,
      end_time: endTime,
      date: date
    };
    return this.http.post(`${this.apiUrl}/AddUserWorkout`, body)
      .pipe(
        catchError(this.handleError)
      );
  }
  
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
