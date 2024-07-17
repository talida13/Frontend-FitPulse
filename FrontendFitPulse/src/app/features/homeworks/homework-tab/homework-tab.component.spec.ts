import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkTabComponent } from './homework-tab.component';

describe('HomeworkTabComponent', () => {
  let component: HomeworkTabComponent;
  let fixture: ComponentFixture<HomeworkTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ HomeworkTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeworkTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
