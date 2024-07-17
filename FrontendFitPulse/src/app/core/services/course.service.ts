import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseDto } from "../models/course-dto.model";
import { Course } from "../models/course.model";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
  })
  export class CoursesService {
    readonly endpoint: string = 'Courses';
  
    constructor(private readonly baseService: BaseService) {}

    public getCourses(): Observable<Course[]> {
        return this.baseService.get<Course[]>(`${this.endpoint}`);
      }
    
      public createCourse(courseDto: CourseDto): Observable<Course> {
        return this.baseService.add<Course, CourseDto>(`${this.endpoint}`, courseDto);
      }
    
      public deleteCourse(id: string) {
        return this.baseService.delete(`${this.endpoint}`, id);
      }
    
      public updateCourse(id: string, courseDto: CourseDto): Observable<Course> {
        return this.baseService.update<Course, CourseDto>(`${this.endpoint}`, id, courseDto);
      }
  }