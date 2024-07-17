import { Component, OnInit } from '@angular/core';
import { Homework } from 'src/app/core/models/homework.model';
import { HomeworksService } from 'src/app/core/services/homework.service';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.scss']
})
export class HomeworksComponent implements OnInit {

  homeworks: Homework[] = [];
  homeworksIndex: string[] = [];
  constructor(private readonly homeworkService: HomeworksService) {}
  
  ngOnInit(): void {
    this.homeworkService.getHomeworks().subscribe((data: Homework[]) => {
      for (const homework of data) {
        this.homeworks.push(homework);
        this.homeworksIndex.push(`Week ${data.indexOf(homework) + 1}`)
      }
    });
  }

}
