import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HomeworkDto } from "../models/homework-dto.model";
import { Homework } from "../models/homework.model";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
  })
  export class HomeworksService {
    readonly endpoint: string = 'Homeworks';
  
    constructor(private readonly baseService: BaseService) {}

    public getHomeworks(): Observable<Homework[]> {
        return this.baseService.get<Homework[]>(`${this.endpoint}`);
      }
    
      public createHomework(homeworkDto: HomeworkDto): Observable<Homework> {
        return this.baseService.add<Homework, HomeworkDto>(`${this.endpoint}`, homeworkDto);
      }
    
      public deleteHomework(id: string) {
        return this.baseService.delete(`${this.endpoint}`, id);
      }
    
      public updateHomework(id: string, homeworkDto: HomeworkDto): Observable<Homework> {
        return this.baseService.update<Homework, HomeworkDto>(`${this.endpoint}`, id, homeworkDto);
      }
  }