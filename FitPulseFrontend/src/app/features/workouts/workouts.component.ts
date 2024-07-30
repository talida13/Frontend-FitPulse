import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { WorkoutService, Workout } from '../../core/services/workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {
  sorting = 'default';
  selectedAuthor = 'all';
  selectedMainCategory = 'all';
  selectedSubCategory = 'all';
  selectedDifficulty = 'all';

  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  pagedWorkouts: Workout[] = [];
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];

  authors: string[] = [];
  mainCategories: string[] = ['time-based', 'scope-based', 'muscle-based'];
  subCategories: string[] = [];

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit() {
    this.fetchWorkouts();
  }

  fetchWorkouts() {
    this.workoutService.getWorkouts().subscribe((data: Workout[]) => {
      this.workouts = data;
      this.authors = [...new Set(data.map(workout => workout.author))]; // Extract unique authors
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredWorkouts = this.workouts.filter(workout => {
      return (this.selectedAuthor === 'all' || workout.author === this.selectedAuthor) &&
             (this.selectedMainCategory === 'all' || workout.category === this.selectedMainCategory) &&
             (this.selectedSubCategory === 'all' || this.matchSubCategory(workout)) &&
             (this.selectedDifficulty === 'all' || workout.difficulty === this.selectedDifficulty);
    });
    this.sortWorkouts();
  }

  matchSubCategory(workout: Workout): boolean {
    if (this.selectedMainCategory === 'time-based') {
      return workout.timeInterval === this.selectedSubCategory;
    }
    if (this.selectedMainCategory === 'scope-based') {
      return workout.scope === this.selectedSubCategory;
    }
    if (this.selectedMainCategory === 'muscle-based') {
      return workout.muscleGroup === this.selectedSubCategory;
    }
    return true;
  }

  onMainCategoryChange() {
    this.selectedSubCategory = 'all';
    if (this.selectedMainCategory === 'time-based') {
      this.subCategories = ['Short', 'Medium', 'Long']; // Example intervals
    } else if (this.selectedMainCategory === 'scope-based') {
      this.subCategories = ['Strength', 'Endurance', 'Flexibility']; // Example scopes
    } else if (this.selectedMainCategory === 'muscle-based') {
      this.subCategories = ['Upper Body', 'Lower Body', 'Full Body']; // Example muscle groups
    } else {
      this.subCategories = [];
    }
    this.applyFilters();
  }

  updateSorting() {
    this.sortWorkouts();
  }

  sortWorkouts() {
    if (this.sorting === 'default') {
      this.filteredWorkouts.sort((a, b) => new Date(b.published_Date).getTime() - new Date(a.published_Date).getTime());
    } else if (this.sorting === 'difficulty-ascending') {
      this.filteredWorkouts.sort((a, b) => this.getDifficultyLevel(a.difficulty) - this.getDifficultyLevel(b.difficulty));
    } else if (this.sorting === 'difficulty-descending') {
      this.filteredWorkouts.sort((a, b) => this.getDifficultyLevel(b.difficulty) - this.getDifficultyLevel(a.difficulty));
    }
    this.updatePagedWorkouts();
  }

  getDifficultyLevel(difficulty: string): number {
    const levels: { [key: string]: number } = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    return levels[difficulty] ?? 0;
  }
  

  updatePagedWorkouts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
  }

  navigateToWorkout(id: number) {
    this.router.navigate([`/Workout/${id}`]);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedWorkouts();
  }
}
