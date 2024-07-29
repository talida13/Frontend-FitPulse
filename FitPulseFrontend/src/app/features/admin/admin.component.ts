/*import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  currentPage = 1;
  totalPages = 5; // Adjust this based on your requirement

  selectedWorkout = '';
  newWorkout = { name: '', calories: '', category: '', difficulty: '', exercises: '' };
  selectedEditWorkout = '';
  editWorkout = { exercises: '', category: '', difficulty: '', calories: '' };
  exerciseToEdit = { name: '', sets: '', reps: '' };

  workouts = ['Treadmill Workout', 'Back Workout', 'Leg Workout', 'Running Workout', 'Cycling Workout', 'Battle Rope Workout', 'Dumbbell Workout']; // List of workouts
  categories = ['Treadmill Workout', 'Back Workout', 'Leg Workout', 'Running Workout', 'Cycling Workout', 'Battle Rope Workout', 'Dumbbell Workout'];
  difficulties = ['easy', 'medium', 'hard'];
  numberOfExercises = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

  skip() {
    this.goToNextPage();
  }

  removeWorkout() {
    // Logic to remove workout
    console.log('Workout removed:', this.selectedWorkout);
    this.goToNextPage();
  }

  addWorkout() {
    // Logic to add workout
    console.log('Workout added:', this.newWorkout);
    this.goToNextPage();
  }

  editExercise() {
    // Logic to edit exercise
    console.log('Exercise edited:', this.exerciseToEdit);
    this.goToNextPage();
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { WorkoutService, Workout } from '../../core/services/workout.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentPage = 1;
  totalPages = 5; // Ajustează după necesități

  workouts: Workout[] = [];
  newWorkout: Workout = { id: 0, name: '', photo: '', author: '', published_Date: new Date(), category: '', difficulty: '' };
  selectedWorkoutId: number | null = null;
  editWorkoutData: Workout | null = null;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.workoutService.getWorkouts().subscribe(
      (data: Workout[]) => this.workouts = data,
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

  addWorkout() {
    this.workoutService.addWorkout(this.newWorkout).subscribe(
      () => {
        this.loadWorkouts();
        this.goToNextPage();
      },
      (error) => console.error(error)
    );
  }

  deleteWorkout() {
    if (this.selectedWorkoutId !== null) {
      this.workoutService.deleteWorkout(this.selectedWorkoutId).subscribe(
        () => {
          this.loadWorkouts();
          this.goToNextPage();
        },
        (error) => console.error(error)
      );
    }
  }

  selectWorkout(id: number) {
    this.selectedWorkoutId = id;
    this.editWorkoutData = this.workouts.find(workout => workout.id === id) || null;
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

  skip() {
    this.goToNextPage();
  }
}
