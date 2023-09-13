import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { ClientsSetupProfessionalInfoComponent } from './clients-setup-professional-info.component';
import { InputFileComponent } from 'src/app/shared/ui/input-file/input-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { ChipsComponent } from 'src/app/shared/ui/chips/chips.component';
import { ChipsAutocompleteComponent } from 'src/app/shared/ui/chipsAutocomplete/chips-autocomplete.component';
import { MatButtonModule } from '@angular/material/button';
import { InputAutocompleteComponent } from 'src/app/shared/ui/input-autocomplete/input-autocomplete.component';
import { DegreeDetailsFormModule } from 'src/app/clients/shared/ui/degree-details-form/degree-details-form.module';
import { CvModule } from 'src/app/clients/shared/feature/cv/cv.module';
import { WorkExperienceModule } from 'src/app/clients/shared/feature/work-experience/work-experience.module';

@NgModule({
  declarations: [ClientsSetupProfessionalInfoComponent],
  imports: [
    CommonModule,
    InputComponent,
    InputAutocompleteComponent,
    ReactiveFormsModule,
    InputFileComponent,
    SelectComponent,
    ChipsComponent,
    ChipsAutocompleteComponent,
    MatButtonModule,
    DegreeDetailsFormModule,
    CvModule,
    WorkExperienceModule

  ],
  exports: [ClientsSetupProfessionalInfoComponent],
})
export class ClientsSetupProfessionalInfoModule { }
