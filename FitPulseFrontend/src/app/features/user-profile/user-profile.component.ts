import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import{User} from 'src/app/core/services/login.service'; // Asigură-te că User este exportat din LoginService

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  selectedStatistic = ['Biological metrics', 'Calories burned', 'Workout history', 'Most common workouts', 'Most common excercises'];
  user: User | undefined;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    // Înlocuiește 'user@example.com' cu email-ul real al utilizatorului
  
    const email = localStorage.getItem('email') ?? '';
    console.log(email);
    this.loginService.getUser(email).subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }
}
