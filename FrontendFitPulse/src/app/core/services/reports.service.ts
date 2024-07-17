import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReportDto } from "../models/reports-dto.model";
import { Report } from "../models/reports.model";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
  })
  export class ReportsService {
    readonly endpoint: string = 'Reports';
  
    constructor(private readonly baseService: BaseService) {}

    public getReports(): Observable<Report[]> {
        return this.baseService.get<Report[]>(`${this.endpoint}`);
      }
    
      public createReport(reportDto: ReportDto): Observable<Report> {
        return this.baseService.add<Report, ReportDto>(`${this.endpoint}`, reportDto);
      }
    
      public deleteReport(id: string) {
        return this.baseService.delete(`${this.endpoint}`, id);
      }
    
      public updateReport(id: string, reportDto: ReportDto): Observable<Report> {
        return this.baseService.update<Report, ReportDto>(`${this.endpoint}`, id, reportDto);
      }
  }