import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCategoriesListComponent } from './clients-categories-list.component';

describe('ClientsCategoriesListComponent', () => {
  let component: ClientsCategoriesListComponent;
  let fixture: ComponentFixture<ClientsCategoriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsCategoriesListComponent]
    });
    fixture = TestBed.createComponent(ClientsCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
