import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherDto } from '../models/teacher-dto.model';
import { Teacher } from '../models/teacher.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  readonly endpoint: string = 'Teachers';

  constructor(private readonly baseService: BaseService) {}

  public getTeachers(): Observable<Teacher[]> {
    return this.baseService.get(`${this.endpoint}`);
  }

  public createTeacher(teacherDto: TeacherDto): Observable<Teacher> {
    return this.baseService.add<Teacher, TeacherDto>(`${this.endpoint}`, teacherDto);
  }

  public deleteTeacher(id: string) {
    return this.baseService.delete(`${this.endpoint}`, id);
  }

  public updateTeacher(id: string, teacherDto: TeacherDto): Observable<Teacher> {
    return this.baseService.update<Teacher, TeacherDto>(`${this.endpoint}`, id, teacherDto);
  }
}
