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

  selectWorkout(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedWorkoutId = Number(selectElement.value);
    this.editWorkoutData = this.workouts.find(workout => workout.id === this.selectedWorkoutId) || null;
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
