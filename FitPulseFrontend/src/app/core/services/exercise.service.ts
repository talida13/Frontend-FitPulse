import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Exercise {
  id: number;
  name: string;
  photo: string;
  workout_id: number;
  reps: number;
  calories_rep: number;

}


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl = `${environment.apiBaseUrl}/Exercises`;

  constructor(private http: HttpClient) { }


  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/GetAllExercises`);
  }

  getExercise(name: string): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/GetExercises`, { params: { name: name.toString() } });
  }
  
  

  addExercise(exercise: Exercise): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/AddExercises`, exercise);
  }

  deleteExercise(name: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/DeleteExercises/${name}`);
  }

  updateWorkout(exercise: Exercise): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/UpdateExercises`, exercise);
  }


}
