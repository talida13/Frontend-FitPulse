import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  features = [
    {
      title: '💰 Pricing ',
      description: 'Enjoy all the features of FitPulse without any cost. Get started on your fitness journey with free access to workout plans, tracking tools, and more.'
    },
    {
      title: '🏋️‍♂️ Workout plans',
      description: 'From beginners to advanced levels, we have plans for everyone designed by expert trainers to help you achieve your fitness targets.'
    },
    {
      title: '📊 Statistics',
      description: 'Monitor your fitness journey with comprehensive statistics. Track your workouts, calories burned, and progress over time with detailed graphs.'
    },
    {
      title: '📈 Progress tracking',
      description: 'Keep an eye on your fitness progress in real-time. Log your workouts, track your performance, and stay motivated with instant feedback on your achievements.'
    }
  ];
  
  

  currentFeatureIndex = 0;
  private intervalId: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      console.log(`Current index: ${this.currentFeatureIndex}`); 
      this.currentFeatureIndex = (this.currentFeatureIndex + 1) % this.features.length;
    }, 3000);
  }
  
  goToWorkouts() {
    this.router.navigate(['/Workouts']);
  }
}
