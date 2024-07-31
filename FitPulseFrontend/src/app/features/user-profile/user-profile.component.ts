import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WeightTrackingService } from 'src/app/core/services/weight-tracking.service';
import { LoginService, User } from 'src/app/core/services/login.service';
import { UsersWorkoutsService } from 'src/app/core/services/users-workouts.service';
import { ExerciseService, Exercise } from 'src/app/core/services/exercise.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  selectedStatistic = ['Biological metrics', 'Calories burned', 'Workout duration', 'Most common workouts', 'Most common exercises'];
  selectedMetric: string = 'Biological metrics';
  selectedPeriod: number = 7;
  user: User | undefined;
  userForm: User | undefined;
  weightTrackingData: any[] = [];
  workoutsData: any[] = [];
  exercisesData: Exercise[] = [];
  commonWorkoutsData: any[] = [];
  commonExercisesData: any[] = [];
  chartOptions: any;

  constructor(
    private loginService: LoginService,
    private weightTrackingService: WeightTrackingService,
    private usersWorkoutsService: UsersWorkoutsService,
    private exerciseService: ExerciseService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getWeightTrackingData();
    this.getExercises();
    this.getWorkoutsData();
    setInterval(() => this.getWeightTrackingData(), 50);
    setInterval(() => this.getExercises(), 50);
    setInterval(() => this.getWorkoutsData(), 50);
    
  }

  getUserProfile(): void {
    const email = localStorage.getItem('email') ?? '';
    this.loginService.getUser(email).subscribe(
      user => {
        this.user = user;
        this.userForm = { ...user };
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  getWeightTrackingData(): void {
    const email = localStorage.getItem('email') ?? '';
    this.weightTrackingService.getWeightTracking(email).subscribe(
      data => {
        this.weightTrackingData = data;
        this.renderChart();
      },
      error => {
        console.error('Error fetching weight tracking data', error);
      }
    );
  }

  getExercises(): void {
    this.exerciseService.getExercises().subscribe(
      data => {
        this.exercisesData = data;
        this.getWorkoutsData(); // Retrieve workouts data after exercises data is loaded
      },
      error => {
        console.error('Error fetching exercises data', error);
      }
    );
  }

  getWorkoutsData(): void {
    const email = localStorage.getItem('email') ?? '';
    this.usersWorkoutsService.getUserWorkouts(email).subscribe(
      workouts => {
        this.workoutsData = workouts;
        this.calculateCaloriesBurnedForWorkouts();
        this.calculateMostCommonWorkouts(); // Calculate common workouts
        this.calculateMostCommonExercises(); // Calculate common exercises
        this.renderChart();
      },
      error => {
        console.error('Error fetching workouts data', error);
      }
    );
  }

  calculateCaloriesBurnedForWorkouts(): void {
    this.workoutsData = this.workoutsData.map(workout => {
      const exercises = this.exercisesData.filter(e => e.workout_Id === workout.workout_id);
      const totalCalories = exercises.reduce((sum, exercise) => sum + (exercise.reps * exercise.calories_rep), 0);
      return { ...workout, totalCalories };
    });
  }

  calculateMostCommonWorkouts(): void {
    const workoutCount: { [key: string]: number } = {};
    
    // Numără aparițiile fiecărui workout
    this.workoutsData.forEach(workout => {
      const workoutName = workout.workout_id; // Asumăm că workout_id este identificatorul unic
      workoutCount[workoutName] = (workoutCount[workoutName] || 0) + 1;
    });
  
    // Calculează totalul pentru toate workout-urile
    const totalWorkouts = this.workoutsData.length;
  
    // Transformă numărul de apariții în procente
    this.commonWorkoutsData = Object.keys(workoutCount).map(key => ({
      name: key,
      y: (workoutCount[key] / totalWorkouts) * 100 // Calculăm procentajul
    }));
  }

  calculateMostCommonExercises(): void {
    const exerciseCount: { [key: string]: number } = {};
    
    // Numără aparițiile fiecărui exercițiu
    this.workoutsData.forEach(workout => {
      const exercises = this.exercisesData.filter(e => e.workout_Id === workout.workout_id);
      exercises.forEach(exercise => {
        exerciseCount[exercise.name] = (exerciseCount[exercise.name] || 0) + 1;
      });
    });

    // Calculează totalul pentru toate exercițiile
    const totalExercises = Object.values(exerciseCount).reduce((a, b) => a + b, 0);

    // Transformă numărul de apariții în procente
    this.commonExercisesData = Object.keys(exerciseCount).map(key => ({
      name: key,
      y: (exerciseCount[key] / totalExercises) * 100 // Calculăm procentajul
    }));
  }

  filterCaloriesData(period: number): any[] {
    const now = new Date();
    const startDate = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);

    return this.workoutsData
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= now;
      })
      .map(entry => ({
        x: new Date(entry.date),
        y: entry.totalCalories
      }));
  }

  filterWeightData(period: number): any[] {
    const now = new Date();
    const startDate = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);

    return this.weightTrackingData
      .filter(entry => {
        const entryDate = new Date(entry.date_weight);
        return entryDate >= startDate && entryDate <= now;
      })
      .map(entry => ({
        x: new Date(entry.date_weight),
        y: entry.weight
      }));
  }

  renderChart(): void {
    if (this.selectedMetric === 'Most common workouts') {
      this.chartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Most Common Workouts"
        },
        data: [{
          type: "pie",
          indexLabel: "{name}: {y}%",
          indexLabelFormatter: (e: any) => {
            return `${e.dataPoint.name}: ${e.dataPoint.y.toFixed(2)}%`;
          },
          dataPoints: this.commonWorkoutsData
        }]
      };
    } else if (this.selectedMetric === 'Most common exercises') {
      this.chartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Most Common Exercises"
        },
        data: [{
          type: "pie",
          indexLabel: "{name}: {y}%",
          indexLabelFormatter: (e: any) => {
            return `${e.dataPoint.name}: ${e.dataPoint.y.toFixed(2)}%`;
          },
          dataPoints: this.commonExercisesData
        }]
      };
    } else {
      // Handle other metrics
      let dataPoints: any[] = [];
  
      if (this.selectedMetric === 'Biological metrics') {
        dataPoints = this.filterWeightData(this.selectedPeriod);
        this.chartOptions = {
          animationEnabled: true,
          theme: "light2",
          title: {
            text: `Weight for the Last ${this.selectedPeriod} Days`
          },
          axisX: {
            valueFormatString: "DD MMM",
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            },
            interval: Math.max(1, Math.floor(dataPoints.length / 10)),
            intervalType: "day",
            labelAngle: -45,
            minimum: new Date(new Date().getTime() - this.selectedPeriod * 24 * 60 * 60 * 1000),
            maximum: new Date()
          },
          axisY: {
            title: "Weight (kg)",
            includeZero: false,
            crosshair: {
              enabled: true
            }
          },
          data: [{
            type: "line",
            xValueFormatString: "DD MMM",
            yValueFormatString: "#,##0.0 kg",
            dataPoints: dataPoints
          }]
        };
      } else if (this.selectedMetric === 'Calories burned') {
        dataPoints = this.filterCaloriesData(this.selectedPeriod);
        this.chartOptions = {
          animationEnabled: true,
          theme: "light2",
          title: {
            text: `Calories Burned for the Last ${this.selectedPeriod} Days`
          },
          axisX: {
            valueFormatString: "DD MMM",
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            },
            interval: Math.max(1, Math.floor(dataPoints.length / 10)),
            intervalType: "day",
            labelAngle: -45,
            minimum: new Date(new Date().getTime() - this.selectedPeriod * 24 * 60 * 60 * 1000),
            maximum: new Date()
          },
          axisY: {
            title: "Calories Burned",
            includeZero: false,
            crosshair: {
              enabled: true
            }
          },
          data: [{
            type: "column",
            xValueFormatString: "DD MMM",
            yValueFormatString: "#,##0 calories",
            dataPoints: dataPoints
          }]
        };
      } else if (this.selectedMetric === 'Workout duration') {
        // Add handling for Workout duration if needed
      }
    }
  
    this.cdr.detectChanges();
  }
  

  onPeriodChange(period: number): void {
    this.selectedPeriod = period;
    this.renderChart();
  }

  updateProfile(): void {
    if (this.userForm) {
      this.loginService.updateUser(this.userForm).subscribe(
        () => {
          this.user = { ...this.userForm! };
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
