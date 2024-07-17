import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLabsComponent } from './add-edit-labs.component';

describe('AddEditLabsComponent', () => {
  let component: AddEditLabsComponent;
  let fixture: ComponentFixture<AddEditLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AddEditLabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
