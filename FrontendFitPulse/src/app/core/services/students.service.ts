import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentDto } from '../models/student-dto.model';
import { Student } from '../models/student.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  readonly endpoint: string = 'Students';

  constructor(private readonly baseService: BaseService) {}

  public getStudents(): Observable<Student[]> {
    return this.baseService.get(`${this.endpoint}`);
  }

  public createStudent(studentDto: StudentDto): Observable<Student> {
    return this.baseService.add<Student, StudentDto>(`${this.endpoint}`, studentDto);
  }

  public deleteStudent(id: string) {
    return this.baseService.delete(`${this.endpoint}`, id);
  }

  public updateStudent(id: string, studentDto: StudentDto): Observable<Student> {
    return this.baseService.update<Student, StudentDto>(`${this.endpoint}`, id, studentDto);
  }
}
