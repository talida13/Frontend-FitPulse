import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Workout {
  id: number;
  name: string;
  photo: string;
  author: string;
  published_Date: Date;
  category: string;
  difficulty: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = `${environment.apiBaseUrl}/Workout`;

  constructor(private http: HttpClient) { }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrl}/GetAllWorkouts`);
  }

  getWorkoutById(id: number): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/GetWorkoutById`, { params: { id: id.toString() } });
  }
  
  getWorkoutByName(name: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.apiUrl}/GetWorkout/${name}`);
  }

  addWorkout(workout: Workout): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/AddWorkout`, workout);
  }

 /* deleteWorkout(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/DeleteWorkout/${id}`);
  }*/
    deleteWorkout(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
  updateWorkout(workout: Workout): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/UpdateWorkout`, workout);
  }
}
