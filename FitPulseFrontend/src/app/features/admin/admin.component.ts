import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  currentPage: number = 1;
  workouts: string[] = ['Workout 1', 'Workout 2', 'Workout 3'];
  categories: string[] = ['Cardio', 'Strength', 'Flexibility'];
  difficultyLevels: string[] = ['Easy', 'Medium', 'Hard'];

  changePage(page: number) {
    this.currentPage = page;
  }
}
