import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSetupCareerInterestsComponent } from './clients-setup-career-interests.component';

describe('ClientsSetupCareerInterestsComponent', () => {
  let component: ClientsSetupCareerInterestsComponent;
  let fixture: ComponentFixture<ClientsSetupCareerInterestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsSetupCareerInterestsComponent]
    });
    fixture = TestBed.createComponent(ClientsSetupCareerInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
