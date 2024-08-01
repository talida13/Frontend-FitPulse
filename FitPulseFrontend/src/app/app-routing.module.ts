import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component'; // Import MainLayoutComponent
import { HomepageComponent } from './layout/homepage/homepage.component';
import { LoginFormComponent } from './features/login-form/login-form.component';
import { RegisterFormComponent } from './features/register-form/register-form.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';
import { WorkoutsComponent } from './features/workouts/workouts.component';
import { AdminComponent } from './features/admin/admin.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { WorkoutDetailsComponent } from './features/workout-details/workout-details.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: 'Home', component: HomepageComponent },
      { path: 'Login', component: LoginFormComponent },
      { path: 'Register', component: RegisterFormComponent },
      { path: 'About', component: AboutUsComponent },
      { path: 'Contact', component: ContactUsComponent },
      { path: 'Workouts', component: WorkoutsComponent },
      { path: 'Workout/:id', component: WorkoutDetailsComponent },
      { path: 'Admin', component: AdminComponent },
      { path: 'Profile', component: UserProfileComponent},
      { path:'Reset', component: ResetPasswordComponent},
      { path: '', redirectTo: 'Home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
