import { Component, OnInit } from '@angular/core';
import { WorkoutService, Workout } from '../../core/services/workout.service';
import { ExerciseService, Exercise } from '../../core/services/exercise.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentPage = 1;
  totalPages = 5;

  workouts: Workout[] = [];
  newWorkout: Workout = { id: 0, name: '', photo: '', author: '', published_Date: new Date(), category: '', difficulty: '' };
  selectedWorkoutId: number | null = null;
  editWorkoutData: Workout | null = null;

  exercises: Exercise[] = [];
  selectedExerciseId: number | null = null;
  editExerciseData: Exercise | null = null;

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadWorkouts();
    this.loadExercises();
  }

  loadWorkouts(): void {
    this.workoutService.getWorkouts().subscribe(
      (data: Workout[]) => this.workouts = data,
      (error) => console.error(error)
    );
  }

  loadExercises(): void {
    this.exerciseService.getExercises().subscribe(
      (data: Exercise[]) => this.exercises = data,
      (error) => console.error(error)
    );
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  deleteWorkout() {
    if (this.selectedWorkoutId !== null) {
      this.workoutService.deleteWorkout(this.selectedWorkoutId).subscribe(
        () => this.loadWorkouts(),
        (error) => console.error(error)
      );
    }
  }

  addWorkout() {
    this.workoutService.addWorkout(this.newWorkout).subscribe(
      () => {
        this.loadWorkouts();
        this.goToNextPage();
      },
      (error) => console.error(error)
    );
  }

  selectWorkout(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const workoutId = Number(selectElement.value);
    this.selectedWorkoutId = workoutId;
    this.editWorkoutData = this.workouts.find(workout => workout.id === workoutId) || null;
  }

  updateWorkout() {
    if (this.editWorkoutData !== null) {
      this.workoutService.updateWorkout(this.editWorkoutData).subscribe(
        () => {
          this.loadWorkouts();
          this.goToNextPage();
        },
        (error) => console.error(error)
      );
    }
  }

  selectExercise(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const exerciseId = Number(selectElement.value);
    this.selectedExerciseId = exerciseId;
    this.editExerciseData = this.exercises.find(exercise => exercise.id === exerciseId) || null;
  }

  updateExercise() {
    if (this.editExerciseData !== null) {
      this.exerciseService.updateExercise(this.editExerciseData).subscribe(
        () => {
          this.loadExercises();
          this.goToNextPage();
        },
        (error) => console.error(error)
      );
    }
  }

  skip() {
    this.goToNextPage();
  }
}
