import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeDetailsFormComponent } from './degree-details-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { InputChipsComponent } from 'src/app/shared/ui/input-chips/input-chips.component';
import { InputAutocompleteComponent } from 'src/app/shared/ui/input-autocomplete/input-autocomplete.component';
import { SelectAutocompleteComponent } from 'src/app/shared/ui/select-autocomplete/select-autocomplete.component';

@NgModule({
  declarations: [DegreeDetailsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    InputChipsComponent,
    InputAutocompleteComponent,
    SelectAutocompleteComponent,
  ],
  exports: [DegreeDetailsFormComponent],
})
export class DegreeDetailsFormModule {}
