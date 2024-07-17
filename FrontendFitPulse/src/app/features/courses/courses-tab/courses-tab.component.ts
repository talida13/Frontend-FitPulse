import { Component, Input } from '@angular/core';
import { Course } from 'src/app/core/models/course.model';

@Component({
  selector: 'app-courses-tab',
  templateUrl: './courses-tab.component.html',
  styleUrls: ['./courses-tab.component.scss']
})
export class CoursesTabComponent {
  @Input() course: Course;
  

}
