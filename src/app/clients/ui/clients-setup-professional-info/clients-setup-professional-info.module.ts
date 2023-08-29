import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { ClientsSetupProfessionalInfoComponent } from './clients-setup-professional-info.component';
import { InputFileComponent } from 'src/app/shared/ui/input-file/input-file.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientsSetupProfessionalInfoComponent],
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    InputFileComponent,
  ],
  exports: [ClientsSetupProfessionalInfoComponent],
})
export class ClientsSetupProfessionalInfoModule {}
