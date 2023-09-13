import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperienceFormComponent } from './work-experience-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChipsAutocompleteComponent } from 'src/app/shared/ui/chipsAutocomplete/chips-autocomplete.component';
import { DatePickerComponent } from 'src/app/shared/ui/date-picker/date-picker.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { ChipsComponent } from 'src/app/shared/ui/chips/chips.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WorkExperienceFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChipsAutocompleteComponent,
    DatePickerComponent,
    InputComponent,
    ChipsComponent,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [WorkExperienceFormComponent],
})
export class WorkExperienceFormModule { }
