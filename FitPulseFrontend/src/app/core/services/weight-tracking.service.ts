import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeightTrackingService {
  private apiUrl = `${environment.apiBaseUrl}/WeightTracking`;

  constructor(private http: HttpClient) { }

  getWeightTracking(userEmail: string): Observable<any> {
    const params = new HttpParams().set('userEmail', userEmail);
    return this.http.get<any>(`${this.apiUrl}/GetWeightTracking`, { params })
      .pipe(
       // tap(data => console.log('Fetched weight tracking:', data)),
        catchError(this.handleError)
      );
  }
  getAllWeightTrackings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllWeightTracking`)
      .pipe(
        tap(data => console.log('Fetched all weight tracking:', data)),
        catchError(this.handleError)
      );
    }

  addWeightTracking(weightTracking: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddWeightTracking`, weightTracking)
      .pipe(
        tap(response => console.log('Added weight tracking:', response)),
        catchError(this.handleError)
      );
  }

  deleteWeightTracking(userEmail: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteWeightTracking`, { body: userEmail })
      .pipe(
        tap(response => console.log('Deleted weight tracking:', response)),
        catchError(this.handleError)
      );
  }

  updateWeightTracking(weightTracking: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateWeightTracking`, weightTracking)
      .pipe(
        tap(response => console.log('Updated weight tracking:', response)),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
