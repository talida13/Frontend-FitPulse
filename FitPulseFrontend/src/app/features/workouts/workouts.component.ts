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
  selected2 = 'option1';
  selected3 = 'none';

  workouts: Workout[] = [];
  pagedWorkouts: Workout[] = [];
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit() {
    this.fetchWorkouts();
  }

  fetchWorkouts() {
    this.workoutService.getWorkouts().subscribe((data: Workout[]) => {
      this.workouts = data;
      this.updatePagedWorkouts();
    });
  }

  updatePagedWorkouts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedWorkouts = this.workouts.slice(startIndex, endIndex);
  }

  navigateToWorkout(id: number) {
    this.router.navigate([`/workout/${id}`]);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedWorkouts();
  }
}
