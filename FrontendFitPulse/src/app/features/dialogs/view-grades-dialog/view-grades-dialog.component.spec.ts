import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TenantService } from 'src/app/core/services/tenant.service';

import { ViewGradesDialogComponent } from './view-grades-dialog.component';

describe('ViewGradesDialogComponent', () => {
  let component: ViewGradesDialogComponent;
  let fixture: ComponentFixture<ViewGradesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, TenantService],
      declarations: [ ViewGradesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGradesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
