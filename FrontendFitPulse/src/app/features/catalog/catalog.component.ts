import { Component, OnInit } from '@angular/core';
import { Lab } from 'src/app/core/models/lab.model';
import { LabsService } from 'src/app/core/services/labs.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  labs: Lab[] = [];
  constructor(private readonly labsService: LabsService) {}
  
  ngOnInit(): void {
    this.labsService.getLabs().subscribe((data: Lab[]) => {
      for (const lab of data) {
        this.labs.push(lab);
      }
    });
  }
}
