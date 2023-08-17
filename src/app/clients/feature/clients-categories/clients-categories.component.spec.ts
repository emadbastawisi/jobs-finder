import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCategoriesComponent } from './clients-categories.component';

describe('ClientsCategoriesComponent', () => {
  let component: ClientsCategoriesComponent;
  let fixture: ComponentFixture<ClientsCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsCategoriesComponent]
    });
    fixture = TestBed.createComponent(ClientsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
