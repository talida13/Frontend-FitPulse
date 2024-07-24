import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { LoginFormComponent } from './features/login-form/login-form.component';
import { RegisterFormComponent } from './features/register-form/register-form.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';
import { WorkoutsComponent } from './features/workouts/workouts.component';
// Import other components as needed

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'Login', component: LoginFormComponent},
  {path: 'Register', component: RegisterFormComponent},
  {path:'About', component: AboutUsComponent},
  {path:'Contact', component: ContactUsComponent},
 // {path:'Profile', component: Profi},
 {path:'Workouts', component: WorkoutsComponent},



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
