import { Component, OnInit } from '@angular/core';
import { WorkoutService, Workout } from '../../core/services/workout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.scss']
})
export class WorkoutDetailsComponent implements OnInit {
  workout: Workout | undefined;

  constructor(private route: ActivatedRoute, private workoutService: WorkoutService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
     // console.log(`id: ${id}`); 
      if (id) {
        this.getWorkoutDetails(id);
      }
    });
  }

  getWorkoutDetails(id: number) {
    this.workoutService.getWorkoutById(id).subscribe(
      (data: Workout) => {
        this.workout = data;
      },
      (error) => {
        console.error('Error fetching workout details:', error);
      }
    );
  }
  

}
