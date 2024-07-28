import { Component, OnInit } from '@angular/core';
import { WorkoutService, Workout } from '../../core/services/workout.service';
import { ExerciseService, Exercise } from '../../core/services/exercise.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.scss']
})
export class WorkoutDetailsComponent implements OnInit {
  slides: { image: string, reps: number, calories_rep: number }[] = [];
  currentIndex = 0;
  workout: Workout | undefined;
  exercises: Exercise[] = [];

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.getWorkoutDetails(id);
      }
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  getWorkoutDetails(id: number) {
    this.workoutService.getWorkoutById(id).subscribe(
      (data: Workout) => {
        this.workout = data;
        this.loadExercises(id);
      },
      (error) => {
        console.error('Error fetching workout details:', error);
      }
    );
  }

  loadExercises(workoutId: number) {
    this.exerciseService.getExercises().subscribe(
      (data: Exercise[]) => {
        this.exercises = data
          .filter(exercise => exercise.workout_id === workoutId)
          .sort((a, b) => a.id - b.id);

          console.log()
        this.slides = this.exercises.map(exercise => ({
          image: exercise.photo,
          reps: exercise.reps,
          calories_rep: exercise.calories_rep
        }));
      },
      (error) => {
        console.error('Error fetching exercises:', error);
      }
    );
  }
}
