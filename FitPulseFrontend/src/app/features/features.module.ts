import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
///import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    WorkoutsComponent,
    AboutUsComponent,
    AdminComponent,
    ContactUsComponent,
    UserProfileComponent,
    WorkoutDetailsComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule
]
})
export class FeaturesModule { }
