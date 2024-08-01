/*
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
  newWorkout: Workout = {
    id: 0,
    name: '',
    photo: '',
    author: '',
    published_Date: new Date(),
    category: '',
    difficulty: '',
    timeInterval: '',
    muscleGroup: '',
    scope: ''
  };
  selectedWorkoutId: number | null = null;
  editWorkoutData: Workout | null = null;

  exercises: Exercise[] = [];
  selectedExerciseId: number | null = null;
  editExerciseData: Exercise | null = null;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadWorkouts();
    this.loadExercises();
  }

  loadWorkouts(): void {
    this.workoutService.getWorkouts().subscribe(
      (data: Workout[]) => this.workouts = data,
      (error) => this.errorMessage = 'Failed to load workouts.'
    );
  }

  loadExercises(): void {
    this.exerciseService.getExercises().subscribe(
      (data: Exercise[]) => this.exercises = data,
      (error) => this.errorMessage = 'Failed to load exercises.'
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
        () => {
          this.loadWorkouts();
          this.successMessage = 'Workout removed successfully.';
          this.selectedWorkoutId = null;
          this.goToNextPage();
        },
        (error) => {
          this.errorMessage = 'Failed to remove workout.';
        }
      );
    }
  }

  addWorkout() {
    this.workoutService.addWorkout(this.newWorkout).subscribe(
      () => {
        this.loadWorkouts();
        this.successMessage = 'Workout added successfully.';
        this.goToNextPage();
      },
      (error) => {
        this.errorMessage = 'Failed to add workout.';
      }
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
          this.successMessage = 'Workout updated successfully.';
          this.goToNextPage();
        },
        (error) => {
          this.errorMessage = 'Failed to update workout.';
        }
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
          this.successMessage = 'Exercise updated successfully.';
          this.goToNextPage();
        },
        (error) => {
          this.errorMessage = 'Failed to update exercise.';
        }
      );
    }
  }

  skip() {
    this.goToNextPage();
  }
}
*/

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
  newWorkout: Workout = {
    id: 0,
    name: '',
    photo: '',
    author: '',
    published_Date: new Date(),
    category: '',
    difficulty: '',
    timeInterval: '', // Asigură-te că aceste proprietăți sunt opționale
    muscleGroup: '',
    scope: ''
  };
  selectedWorkoutName: string | null = null;
  editWorkoutData: Workout | null = null;

  exercises: Exercise[] = [];
  selectedExerciseId: number | null = null;
  editExerciseData: Exercise | null = null;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadWorkouts();
    this.loadExercises();
  }

  loadWorkouts(): void {
    this.workoutService.getWorkouts().subscribe(
      (data: Workout[]) => this.workouts = data,
      (error) => this.errorMessage = 'Failed to load workouts.'
    );
  }

  loadExercises(): void {
    this.exerciseService.getExercises().subscribe(
      (data: Exercise[]) => this.exercises = data,
      (error) => this.errorMessage = 'Failed to load exercises.'
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
    if (this.selectedWorkoutName !== null) {
      console.log(`Deleting workout with ID: ${this.selectedWorkoutName}`); // Debugging log
      this.workoutService.deleteWorkout(this.selectedWorkoutName).subscribe(
        () => {
          this.loadWorkouts();
          this.successMessage = 'Workout removed successfully.';
          this.selectedWorkoutName = null; // Reset selectedWorkoutId
          this.goToNextPage();
        },
        (error) => {
          console.error('Error removing workout:', error); // Debugging log
          this.errorMessage = 'Failed to remove workout.';
        }
      );
    } else {
      this.errorMessage = 'No workout selected for deletion.';
    }
  }

  addWorkout() {
    this.workoutService.addWorkout(this.newWorkout).subscribe(
      () => {
        this.loadWorkouts();
        this.successMessage = 'Workout added successfully.';
        this.goToNextPage();
      },
      (error) => {
        console.error('Error adding workout:', error); // Debugging log
        this.errorMessage = 'Failed to add workout.';
      }
    );
  }

  selectWorkout(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const workoutName = String(selectElement.value);
    this.selectedWorkoutName = workoutName;
    this.editWorkoutData = this.workouts.find(workout => workout.name === workoutName) || null;
  }

  updateWorkout() {
    if (this.editWorkoutData !== null) {
      this.workoutService.updateWorkout(this.editWorkoutData).subscribe(
        () => {
          this.loadWorkouts();
          this.successMessage = 'Workout updated successfully.';
          this.goToNextPage();
        },
        (error) => {
          console.error('Error updating workout:', error); // Debugging log
          this.errorMessage = 'Failed to update workout.';
        }
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
          this.successMessage = 'Exercise updated successfully.';
          this.goToNextPage();
        },
        (error) => {
          console.error('Error updating exercise:', error); // Debugging log
          this.errorMessage = 'Failed to update exercise.';
        }
      );
    }
  }

  skip() {
    this.goToNextPage();
  }
}
