import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeSortComponent } from './merge-sort.component';

describe('MergeSortComponent', () => {
  let component: MergeSortComponent;
  let fixture: ComponentFixture<MergeSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MergeSortComponent]
    });
    fixture = TestBed.createComponent(MergeSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
