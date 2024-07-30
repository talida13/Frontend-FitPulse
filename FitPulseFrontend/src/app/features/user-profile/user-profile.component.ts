import { Component, OnInit } from '@angular/core';
import { UserStatisticsService } from 'src/app/core/services/user-statistics.service';
import { LoginService, User } from 'src/app/core/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  selectedStatistic = ['Biological metrics', 'Calories burned', 'Workout history', 'Most common workouts', 'Most common exercises'];
  user: User | undefined; // Profilul utilizatorului
  userForm: User | undefined; // Copia utilizatorului pentru editare
  selectedData: any; // Datele pentru grafic
  selectedMetric: string = 'Biological metrics'; // Metricul selectat pentru grafic

  constructor(
    private loginService: LoginService,
    private userStatisticsService: UserStatisticsService
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const email = localStorage.getItem('email') ?? '';
    this.loginService.getUser(email).subscribe(
      user => {
        this.user = user;
        this.userForm = { ...user };
        this.loadStatistics();
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  loadStatistics(): void {
    if (this.user) {
      this.userStatisticsService.getStatisticsByEmail(this.user.email).subscribe(
        data => {
          this.selectedData = data;
          this.updateChart();
        },
        error => {
          console.error('Error fetching user statistics', error);
        }
      );
    }
  }

  updateChart(): void {
    // Logica pentru actualizarea graficului bazată pe `selectedData` și `selectedMetric`
  }

  onMetricChange(metric: string): void {
    this.selectedMetric = metric;
    this.updateChart();
  }

  updateProfile(): void {
    if (this.userForm) {
      this.loginService.updateUser(this.userForm).subscribe(
        () => {
          console.log('Profile updated successfully');
          this.user = { ...this.userForm! };
          this.loadStatistics();
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
