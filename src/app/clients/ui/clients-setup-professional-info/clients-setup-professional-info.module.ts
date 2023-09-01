import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { ClientsSetupProfessionalInfoComponent } from './clients-setup-professional-info.component';
import { InputFileComponent } from 'src/app/shared/ui/input-file/input-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { ChipsComponent } from 'src/app/shared/ui/chips/chips.component';
import { ChipsAutocompleteComponent } from 'src/app/shared/ui/chipsAutocomplete/chips-autocomplete.component';
import { DatePickerComponent } from 'src/app/shared/ui/date-picker/date-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { WorkExperienceFormModule } from '../../shared/ui/work-experience/work-experience-form.module';
import { DegreeDetailsFormModule } from '../../shared/ui/degree-details-form/degree-details-form.module';

@NgModule({
  declarations: [ClientsSetupProfessionalInfoComponent],
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    InputFileComponent,
    SelectComponent,
    ChipsComponent,
    ChipsAutocompleteComponent,
    DatePickerComponent,
    MatButtonModule,
    WorkExperienceFormModule,
    DegreeDetailsFormModule,
  ],
  exports: [ClientsSetupProfessionalInfoComponent],
})
export class ClientsSetupProfessionalInfoModule {}
