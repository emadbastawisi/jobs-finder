import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MergeSortRoutingModule } from './merge-sort-routing.module';
import { MergeSortComponent } from './merge-sort.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../shared/ui/input/input.component';
import { ChipComponent } from '../shared/ui/chip/chip.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    MergeSortComponent
  ],
  imports: [
    CommonModule,
    MergeSortRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    ChipComponent,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule,
    MatGridListModule
  ]
})
export class MergeSortModule { }
