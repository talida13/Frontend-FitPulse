import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation-menu-content',
  templateUrl: './navigation-menu-content.component.html',
  styleUrls: ['./navigation-menu-content.component.scss']
})
export class NavigationMenuContentComponent implements OnInit{
  @Output() drawerToggle: EventEmitter<unknown> = new EventEmitter();
  isAdminOn: boolean;
  constructor(private readonly router: Router) {
    
  }

  ngOnInit(): void {
    this.isAdminOn = environment.isAdminOn;
  }

  goToDashboard(): void {
    this.router.navigateByUrl('Dashboard/WelcomePage');
    this.drawerToggle.emit();
  }

  goToCatalog(): void {
    this.router.navigateByUrl('Dashboard/Catalog');
    this.drawerToggle.emit();
  }

  goToHomeworks(): void {
    this.router.navigateByUrl('Dashboard/Homeworks');
    this.drawerToggle.emit();
  }

  goToCourses(): void {
    this.router.navigateByUrl('Dashboard/Courses');
    this.drawerToggle.emit();
  }

  goToTeachers(): void {
    this.router.navigateByUrl('Dashboard/Teachers');
    this.drawerToggle.emit();
  }

  goToAddEditTeachers(): void {
    this.router.navigateByUrl('Dashboard/AddEditTeachers');
    this.drawerToggle.emit();
  }

  goToAddEditCourses(): void {
    this.router.navigateByUrl('Dashboard/AddEditCourses');
    this.drawerToggle.emit();
  }

  goToAddEditLabs(): void {
    this.router.navigateByUrl('Dashboard/AddEditLabs');
    this.drawerToggle.emit();
  }

  goToAddEditHomeworks(): void {
    this.router.navigateByUrl('Dashboard/AddEditHomeworks');
    this.drawerToggle.emit();
  }

  goToAddEditStudents(): void {
    this.router.navigateByUrl('Dashboard/AddEditStudents');
    this.drawerToggle.emit();
  }
}
