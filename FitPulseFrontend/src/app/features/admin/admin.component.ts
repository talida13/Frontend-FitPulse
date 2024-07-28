import { Component } from '@angular/core';

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

  workouts = ['treadmill workout', 'leg workout', 'back workout', 'running workout']; // List of workouts
  categories = ['strength', 'cardio', 'flexibility'];
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
