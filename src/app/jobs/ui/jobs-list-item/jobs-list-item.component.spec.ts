import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsListItemComponent } from './jobs-list-item.component';

describe('JobsListItemComponent', () => {
  let component: JobsListItemComponent;
  let fixture: ComponentFixture<JobsListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsListItemComponent]
    });
    fixture = TestBed.createComponent(JobsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
