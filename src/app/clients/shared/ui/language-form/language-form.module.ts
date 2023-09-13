import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageFormComponent } from './language-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InputAutocompleteComponent } from 'src/app/shared/ui/input-autocomplete/input-autocomplete.component';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LanguageFormComponent
  ],
  imports: [
    CommonModule,
    InputAutocompleteComponent,
    ReactiveFormsModule,
    SelectComponent,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [LanguageFormComponent]
})
export class LanguageFormModule { }
