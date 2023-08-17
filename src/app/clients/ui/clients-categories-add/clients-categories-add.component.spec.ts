import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCategoriesAddComponent } from './clients-categories-add.component';

describe('ClientsCategoriesAddComponent', () => {
  let component: ClientsCategoriesAddComponent;
  let fixture: ComponentFixture<ClientsCategoriesAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsCategoriesAddComponent]
    });
    fixture = TestBed.createComponent(ClientsCategoriesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
