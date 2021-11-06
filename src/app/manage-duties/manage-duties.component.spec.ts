import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDutiesComponent } from './manage-duties.component';

describe('ManageDutiesComponent', () => {
  let component: ManageDutiesComponent;
  let fixture: ComponentFixture<ManageDutiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDutiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
