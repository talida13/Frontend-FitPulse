import { Component, Input } from '@angular/core';
import { Homework } from 'src/app/core/models/homework.model';

@Component({
  selector: 'app-homework-tab',
  templateUrl: './homework-tab.component.html',
  styleUrls: ['./homework-tab.component.scss']
})
export class HomeworkTabComponent{
  @Input() homework: Homework;

}
