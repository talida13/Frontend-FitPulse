import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navigation-menu-content',
  templateUrl: './navigation-menu-content.component.html',
  styleUrls: ['./navigation-menu-content.component.scss']
})
export class NavigationMenuContentComponent implements OnInit {
  @Output() drawerToggle: EventEmitter<unknown> = new EventEmitter();
  isAdminOn: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private readonly router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.isAdminOn().subscribe((isAdminOn: boolean) => {
      this.isAdminOn = isAdminOn;
    });
  }

  goToLogin(): void {
    this.router.navigateByUrl('Login');
    this.drawerToggle.emit();
  }
  
  goToHome(): void {
    this.router.navigateByUrl('Home');
    this.drawerToggle.emit();
  }

  goToAbout(): void {
    this.router.navigateByUrl('About');
    this.drawerToggle.emit();
  }

  goToContact(): void {
    this.router.navigateByUrl('Contact');
    this.drawerToggle.emit();
  }

  goToAdmin(): void {
    this.router.navigateByUrl('Admin');
    this.drawerToggle.emit();
  }

  goToProfile(): void {
    this.router.navigateByUrl('Profile');
    this.drawerToggle.emit();
  }

  goToWorkouts(): void {
    this.router.navigateByUrl('Workouts');
    this.drawerToggle.emit();
  }
}
