import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsSetupGeneralInfoComponent } from './clients-setup-general-info.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { DatePickerComponent } from 'src/app/shared/ui/date-picker/date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChipsComponent } from 'src/app/shared/ui/chips/chips.component';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';

@NgModule({
  declarations: [ClientsSetupGeneralInfoComponent],
  imports: [
    CommonModule,
    InputComponent,
    DatePickerComponent,
    ChipsComponent,
    SelectComponent,
    ReactiveFormsModule,
  ],
  exports: [ClientsSetupGeneralInfoComponent],
})
export class ClientsSetupGeneralInfoModule {}
