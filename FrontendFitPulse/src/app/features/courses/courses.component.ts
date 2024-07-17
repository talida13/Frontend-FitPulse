import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/course.model';
import { CoursesService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  coursesIndex: string[] = [];
  constructor(private readonly coursesService: CoursesService) {}
  
  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((data: Course[]) => {
      for (const course of data) {
        this.courses.push(course);
        this.coursesIndex.push(`Week ${data.indexOf(course) + 1}`)
      }
    });
  }

}
