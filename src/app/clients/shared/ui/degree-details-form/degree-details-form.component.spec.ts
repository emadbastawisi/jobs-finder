import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeDetailsFormComponent } from './degree-details-form.component';

describe('DegreeDetailsFormComponent', () => {
  let component: DegreeDetailsFormComponent;
  let fixture: ComponentFixture<DegreeDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegreeDetailsFormComponent]
    });
    fixture = TestBed.createComponent(DegreeDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
