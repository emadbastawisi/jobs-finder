import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsSetupCareerInterestsComponent } from './clients-setup-career-interests.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    ClientsSetupCareerInterestsComponent
  ],
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  exports: [
    ClientsSetupCareerInterestsComponent
  ]
})
export class ClientsSetupCareerInterestsModule { }
