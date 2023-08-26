import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSetupComponent } from './clients-setup.component';

describe('ClientsSetupComponent', () => {
  let component: ClientsSetupComponent;
  let fixture: ComponentFixture<ClientsSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsSetupComponent]
    });
    fixture = TestBed.createComponent(ClientsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
