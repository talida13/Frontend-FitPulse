import { Component, OnInit } from '@angular/core';
import { WorkoutService, Workout } from '../../core/services/workout.service';
import { ExerciseService, Exercise } from '../../core/services/exercise.service';
import { ActivatedRoute } from '@angular/router';
import { UsersWorkoutsService } from 'src/app/core/services/users-workouts.service';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.scss']
})
export class WorkoutDetailsComponent implements OnInit {
  slides: { name: string, image: string, reps: number, calories_rep: number }[] = [];
  currentIndex = 0;
  workout: Workout | undefined;
  exercises: Exercise[] = [];
  timer: any;
  elapsedTime = 0; // Time in milliseconds
  displayTime = '00:00:00'; // Format for display
  showPopup = false; // Flag to control popup visibility
  popupMessage = ''; // Message to display in the popup
  startTime: string | null = null; // Start time of the workout session

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private usersWorkoutsService: UsersWorkoutsService, // Injectează serviciul
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
        console.log(id);
      },
      (error) => {
        console.error('Error fetching workout details:', error);
      }
    );
  }

  loadExercises(workoutId: number) {
    this.exerciseService.getExercises().subscribe(
      (data: Exercise[]) => {
        console.log('All exercises:', data);
  
   
        this.exercises = data
          .filter(exercise => Number(exercise.workout_Id) === workoutId);
  
        console.log('Filtered exercises:', this.exercises);
  
        this.slides = this.exercises.map(exercise => ({
          name: exercise.name,
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

  startWorkout() {
    this.elapsedTime = 0;
    this.startTime = new Date().toISOString(); 
    this.timer = setInterval(() => {
      this.elapsedTime += 1;
      this.updateDisplayTime();
    }, 1000);
  }

  stopWorkout() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      const endTime = new Date().toISOString(); 
      this.popupMessage = `Great job! Your workout duration was ${this.displayTime}`;
      this.showPopup = true;
      this.saveWorkoutSession(this.startTime, endTime);
    }
    this.displayTime = '00:00:00';
  }

  updateDisplayTime() {
    const hours = Math.floor(this.elapsedTime / 3600);
    const minutes = Math.floor((this.elapsedTime % 3600) / 60);
    const seconds = this.elapsedTime % 60;

    this.displayTime = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;
  }

  pad(num: number, size: number) {
    let s = String(num);
    while (s.length < size) s = '0' + s;
    return s;
  }

  closePopup() {
    this.showPopup = false; // Hide the popup
  }

  saveWorkoutSession(startTime: string | null = null, endTime: string) {
    if (startTime === null) {
      startTime = '';
    }
    const userEmail = localStorage.getItem('email'); // Obține emailul din localStorage
    if (userEmail && this.workout) {
      const workoutSession = {
        user_email: userEmail,
        workout_id: this.workout.id,
        start_time: startTime,
        end_time: endTime,
        date: new Date().toISOString() // Date of the session
      };
  
      console.log('Sending workout session data:', workoutSession);
  
      this.usersWorkoutsService.addUserWorkout(
        userEmail,
        this.workout.id,
        startTime,
        endTime,
        new Date().toISOString()
      ).subscribe(
        () => console.log('Workout session saved successfully'),
        (error) => {
          console.error('Error saving workout session:', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
    } else {
      console.error('User email or workout information is missing');
    }
  }
  
  
}
