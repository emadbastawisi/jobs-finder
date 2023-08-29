import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSetupProfessionalInfoComponent } from './clients-setup-professional-info.component';

describe('ClientsSetupProfessionalInfoComponent', () => {
  let component: ClientsSetupProfessionalInfoComponent;
  let fixture: ComponentFixture<ClientsSetupProfessionalInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsSetupProfessionalInfoComponent]
    });
    fixture = TestBed.createComponent(ClientsSetupProfessionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
