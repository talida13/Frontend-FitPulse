import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {
  sorting = 'default';
  selected2 = 'option1';
  selected3 = 'none';

  workouts = [
    { id: 1, title: 'Treadmill Workout', info: '290 kcal' },
    { id: 2, title: 'Back Workout', info: '100 kcal' },
    { id: 3, title: 'Workout3', info: '100 kcal' },
    { id: 4, title: 'Workout3', info: '100 kcal' },
    { id: 5, title: 'Workout3', info: '100 kcal' },
    { id: 6, title: 'Workout3', info: '100 kcal' },
    { id: 7, title: 'Workout3', info: '100 kcal' },
    { id: 8, title: 'Workout3', info: '100 kcal' },
    { id: 9, title: 'Workout3', info: '100 kcal' },
    { id: 10, title: 'Workout3', info: '100 kcal' },
    { id: 11, title: 'Workout3', info: '100 kcal' },
    { id: 12, title: 'Workout3', info: '100 kcal' },
    // Adaugă restul antrenamentelor tale aici
  ];

  pagedWorkouts: { id: number; title: string; info: string; }[] = [];
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updatePagedWorkouts();
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
