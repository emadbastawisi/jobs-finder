import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsSetupRoutingModule } from './clients-setup-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { ClientsSetupComponent } from './clients-setup.component';
import { MatChipsModule } from '@angular/material/chips';
import { ClientsSetupCareerInterestsModule } from './feature/clients-setup-career-interests/clients-setup-career-interests.module';
import { ClientsSetupGeneralInfoModule } from './feature/clients-setup-general-info/clients-setup-general-info.module';
import { ClientsSetupProfessionalInfoModule } from './feature/clients-setup-professional-info/clients-setup-professional-info.module';

@NgModule({
  declarations: [ClientsSetupComponent],
  imports: [
    CommonModule,
    ClientsSetupRoutingModule,
    ClientsSetupCareerInterestsModule,
    ClientsSetupGeneralInfoModule,
    ClientsSetupProfessionalInfoModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    InputComponent,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatChipsModule,
  ],
  exports: [ClientsSetupComponent],
})
export class ClientsSetupModule { }
