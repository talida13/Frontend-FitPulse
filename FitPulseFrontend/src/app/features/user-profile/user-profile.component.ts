import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WeightTrackingService } from 'src/app/core/services/weight-tracking.service';
import { LoginService, User, EditCredentials } from 'src/app/core/services/login.service';
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
  newWeight: number | undefined;
  editCredentials!:  EditCredentials;

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
  //  console.log(this.exercisesData);
  
    
  //  if(this.weightTrackingData.length > 0)
     // setInterval(() => this.getWeightTrackingData(), 100);
   // if(this.exercisesData.length>0)
      //setInterval(() => this.getExercises(), 100);
 //   if(this.workoutsData.length>0)
      //setInterval(() => this.getWorkoutsData(), 100);
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
        this.getWorkoutsData(); 
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
        this.workoutsData = workouts.map(workout => ({
          ...workout,
          duration: this.calculateWorkoutDuration(workout)
        }));
        this.calculateCaloriesBurnedForWorkouts();
        this.calculateMostCommonWorkouts(); 
        this.calculateMostCommonExercises(); 
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

    this.workoutsData.forEach(workout => {
      const workoutName = workout.workout_id; 
      workoutCount[workoutName] = (workoutCount[workoutName] || 0) + 1;
    });

    const totalWorkouts = this.workoutsData.length;
    this.commonWorkoutsData = Object.keys(workoutCount).map(key => ({
      name: key,
      y: (workoutCount[key] / totalWorkouts) * 100 
    }));
  }

  calculateMostCommonExercises(): void {
    const exerciseCount: { [key: string]: number } = {};

    this.workoutsData.forEach(workout => {
      const exercises = this.exercisesData.filter(e => e.workout_Id === workout.workout_id);
      exercises.forEach(exercise => {
        exerciseCount[exercise.name] = (exerciseCount[exercise.name] || 0) + 1;
      });
    });

    const totalExercises = Object.values(exerciseCount).reduce((a, b) => a + b, 0);
    this.commonExercisesData = Object.keys(exerciseCount).map(key => ({
      name: key,
      y: (exerciseCount[key] / totalExercises) * 100 
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

  filterWorkoutDurationData(period: number): any[] {
    const now = new Date();
    let startDate: Date;
    let interval: string;

    if (period === 7) {
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      interval = 'hour';
    } else if (period === 30) {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      interval = 'day';
    } else if (period === 60) {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      interval = 'day';
    } else {
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      interval = 'month';
    }

    const filtered = this.workoutsData
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= now;
      })
      .map(entry => ({
        x: new Date(entry.date),
        y: entry.duration
      }));

    const groupedData: { [key: string]: number } = {};
    filtered.forEach(entry => {
      let key: string;
      const entryDate = new Date(entry.x);
      if (interval === 'hour') {
        key = entryDate.getHours().toString();
      } else if (interval === 'day') {
        key = entryDate.toDateString();
      } else {
        key = `${entryDate.getFullYear()}-${entryDate.getMonth() + 1}`;
      }
      if (!groupedData[key]) {
        groupedData[key] = 0;
      }
      groupedData[key] += entry.y;
    });

    return Object.keys(groupedData).map(key => ({
      label: key,
      y: groupedData[key]
    }));
  }

  calculateWorkoutDuration(workout: any): number {
    const startTime = new Date(workout.start_time);
    const endTime = new Date(workout.end_time);
    return (endTime.getTime() - startTime.getTime()) / (1000 * 60); 
  }

  renderChart(): void {
    if (this.selectedMetric === 'Most common workouts') {
      if (this.commonWorkoutsData.length === 0) {
        this.chartOptions = {}; 
      } else {
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
      }
    } else if (this.selectedMetric === 'Calories burned') {
      this.chartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Calories Burned"
        },
        axisX: {
          valueFormatString: "DD MMM",
          interval: 1,
          intervalType: "day"
        },
        axisY: {
          title: "Calories",
          includeZero: false
        },
        data: [{
          type: "column",
          dataPoints: this.filterCaloriesData(this.selectedPeriod)
        }]
      };
    } else if (this.selectedMetric === 'Biological metrics') {
      this.chartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Weight"
        },
        axisX: {
          valueFormatString: "DD MMM",
          interval: 1,
          intervalType: "day"
        },
        axisY: {
          title: "Weight (kg)",
          includeZero: false
        },
        data: [{
          type: "line",
          dataPoints: this.filterWeightData(this.selectedPeriod)
        }]
      };
    } else if (this.selectedMetric === 'Workout duration') {
      const durationData = this.filterWorkoutDurationData(this.selectedPeriod);
      this.chartOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Workout Duration"
        },
        axisX: {
          interval: 1,
          labelAngle: -70,
          intervalType: this.selectedPeriod === 7 ? "hour" : (this.selectedPeriod <= 60 ? "day" : "month"),
          valueFormatString: this.selectedPeriod === 7 ? "HH" : (this.selectedPeriod <= 60 ? "DD MMM" : "MMM YYYY")
        },
        axisY: {
          title: "Duration (minutes)",
          includeZero: false
        },
        data: [{
          type: "column",
          dataPoints: durationData
        }]
      };
    } else if (this.selectedMetric === 'Most common exercises') {
      if (this.commonExercisesData.length === 0) {
        this.chartOptions = {}; 
      } else {
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
      }
    }
    this.cdr.detectChanges();
  }


  onPeriodChange(period: number): void {
    this.selectedPeriod = period;
    this.getWeightTrackingData();
   
    this.getExercises();
  
    this.getWorkoutsData();
    this.renderChart();
 
   
  }
  
  refresh(): void {
    this.getWeightTrackingData();
    this.getExercises();
    this.getWorkoutsData();
    this.renderChart();
  }
  getLastWeightTrackingId(): void {
    this.weightTrackingService.getAllWeightTrackings().subscribe(
      data => {
  
        const lastId = data.length > 0 ? Math.max(...data.map((entry: any) => entry.id)) : 0;
        this.addNewWeightTracking(lastId + 1); 
      },
      error => {
        console.error('Error fetching weight tracking data', error);
      }
    );
  }
  
  addNewWeightTracking(newId: number): void {
    if (this.newWeight) {
      const email = localStorage.getItem('email') ?? '';
      const newWeightEntry = {
        id: newId,
        user_email: email,
        weight: this.newWeight,
        date_weight: new Date().toISOString()
      };
      console.log(newWeightEntry.weight);

      this.weightTrackingService.addWeightTracking(newWeightEntry).subscribe(
        response => {
          console.log('Weight logged successfully', response);
          this.updateUserProfileWithNewWeight(); 
          this.getWeightTrackingData(); 
          this.newWeight = undefined; 
        },
        error => {
          console.error('Error logging weight', error);
          if (error.error) {
            console.error('Detailed error:', error.error);
          }
        }
      );
    }
  }
  
  updateUserProfileWithNewWeight(): void {
    if (this.userForm && this.newWeight !== undefined) {

      this.editCredentials = {...this.userForm};

      this.editCredentials.weight = this.newWeight
      this.loginService.editProfile(this.editCredentials).subscribe(
        () => {
          console.log('User profile updated successfully');
        },
        error => {
          console.error('Error updating user profile', error);
        }
      );
    }
  }
  
  logWeight(): void {
      this.getLastWeightTrackingId();
  }

  updateProfile(): void {

    const email = localStorage.getItem('email') || ' ';

    if (this.userForm) {
        this.editCredentials = {...this.userForm}
        console.log(this.editCredentials);
        this.loginService.editProfile(this.editCredentials).subscribe(
          next =>{
            console.log('Pasword updated');
            window.location.reload();
          },
          error =>{
            console.log('Pasword updated error');
          }
        );
    }
  }
}