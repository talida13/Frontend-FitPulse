import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { WorkoutsComponent } from './workouts/workouts.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    WorkoutsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }
