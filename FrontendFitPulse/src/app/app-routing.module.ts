import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCoursesComponent } from './features/add-edit-courses/add-edit-courses.component';
import { AddEditHomeworksComponent } from './features/add-edit-homeworks/add-edit-homeworks.component';
import { AddEditLabsComponent } from './features/add-edit-labs/add-edit-labs.component';
import { AddEditStudentsComponent } from './features/add-edit-students/add-edit-students.component';
import { AddEditTeachersComponent } from './features/add-edit-teachers/add-edit-teachers.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { CoursesComponent } from './features/courses/courses.component';
import { HomeworksComponent } from './features/homeworks/homeworks.component';
import { LoginFormComponent } from './features/login-form/login-form.component';
import { RegisterFormComponent } from './features/register-form/register-form.component';
import { TeachersComponent } from './features/teachers/teachers.component';
import { WelcomePageComponent } from './features/welcome-page/welcome-page.component';
import { HomepageComponent } from './layout/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full'
  },
  {
    path: 'Login',
    component: LoginFormComponent
  },
  {
    path: 'Register',
    component: RegisterFormComponent
  },
  {
    path: 'Dashboard',
    component: HomepageComponent,
    children: [
      {
        path: '',
        redirectTo: 'WelcomePage',
        pathMatch: 'full'
      },
      {
        path: 'WelcomePage',
        component: WelcomePageComponent
      },
      {
        path: 'Catalog',
        component: CatalogComponent
      },
      {
        path: 'Teachers',
        component: TeachersComponent
      },
      {
        path: 'Courses',
        component: CoursesComponent
      },
      {
        path: 'Homeworks',
        component: HomeworksComponent
      },
      {
        path: 'AddEditTeachers',
        component: AddEditTeachersComponent
      },
      {
        path: 'AddEditLabs',
        component: AddEditLabsComponent
      },
      {
        path: 'AddEditHomeworks',
        component: AddEditHomeworksComponent
      },
      {
        path: 'AddEditCourses',
        component: AddEditCoursesComponent
      },
      {
        path: 'AddEditStudents',
        component: AddEditStudentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
