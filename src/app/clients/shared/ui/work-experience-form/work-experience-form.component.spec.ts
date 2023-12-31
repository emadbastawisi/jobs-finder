import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceFormComponent } from './work-experience-form.component';

describe('WorkExperienceFormComponent', () => {
  let component: WorkExperienceFormComponent;
  let fixture: ComponentFixture<WorkExperienceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkExperienceFormComponent]
    });
    fixture = TestBed.createComponent(WorkExperienceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
