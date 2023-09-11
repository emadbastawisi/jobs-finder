import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionSortRoutingModule } from './selection-sort-routing.module';
import { SelectionSortComponent } from './selection-sort.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../shared/ui/input/input.component';
import { ChipComponent } from '../shared/ui/chip/chip.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [SelectionSortComponent],
  imports: [
    CommonModule,
    SelectionSortRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    ChipComponent,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  exports: [
    SelectionSortComponent
  ]
})
export class SelectionSortModule { }
