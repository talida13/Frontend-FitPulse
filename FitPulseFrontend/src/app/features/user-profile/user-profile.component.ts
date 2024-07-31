import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WeightTrackingService } from 'src/app/core/services/weight-tracking.service';
import { LoginService, User } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  selectedStatistic = ['Biological metrics', 'Calories burned', 'Workout history', 'Most common workouts', 'Most common exercises'];
  selectedMetric: string = 'Biological metrics';
  selectedPeriod: number = 7;
  user: User | undefined;
  userForm: User | undefined;
  weightTrackingData: any[] = [];
  chartOptions: any;

  constructor(
    private loginService: LoginService,
    private weightTrackingService: WeightTrackingService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.getUserProfile();
    this.getWeightTrackingData();
    setInterval(() => this.getWeightTrackingData(), 500);
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
        console.log('Fetched weight tracking:', data);
        this.weightTrackingData = data;
        this.renderChart(); // Renderizează graficul după ce datele sunt încărcate
      },
      error => {
        console.error('Error fetching weight tracking data', error);
      }
    );
  }
  
  filterWeightData(period: number): any[] {
    const now = new Date();
    const startDate = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);
  
    const filteredData = this.weightTrackingData.filter(entry => {
      const entryDate = new Date(entry.date_weight);
      return entryDate >= startDate && entryDate <= now;
    });
  
    if (filteredData.length === 0) {
      console.warn(`No data available for the last ${period} days.`);
      return [];
    }
  
    const dataPoints = filteredData.map(entry => ({
      x: new Date(entry.date_weight),
      y: entry.weight
    }));
  
    console.log('Filtered Data Points:', dataPoints);
  
    return dataPoints;
  }
  
  renderChart(): void {
    const dataPoints = this.filterWeightData(this.selectedPeriod);
  
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
  
    console.log('Chart Options:', this.chartOptions);

    // Trigger change detection
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
          console.log('Profile updated successfully');
          this.user = { ...this.userForm! };
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
