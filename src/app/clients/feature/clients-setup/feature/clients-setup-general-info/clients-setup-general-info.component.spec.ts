import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSetupGeneralInfoComponent } from './clients-setup-general-info.component';

describe('ClientsSetupGeneralInfoComponent', () => {
  let component: ClientsSetupGeneralInfoComponent;
  let fixture: ComponentFixture<ClientsSetupGeneralInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsSetupGeneralInfoComponent]
    });
    fixture = TestBed.createComponent(ClientsSetupGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
