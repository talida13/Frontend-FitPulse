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
  timeInterval?: string; // Proprietăți opționale
  scope?: string;
  muscleGroup?: string;
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

   /* deleteWorkout(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }*/
      deleteWorkout(name: string): Observable<void> {
        console.log(`Attempting to delete workout with ID: ${name}`); // Log ID-ul workout-ului
        return this.http.delete<void>(`${this.apiUrl}/DeleteWorkout`, { params: { name: name } });
      }
  
  updateWorkout(workout: Workout): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/UpdateWorkout`, workout);
  }
}
