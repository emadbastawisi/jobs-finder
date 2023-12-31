import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BinarySearchRoutingModule } from './binary-search-routing.module';
import { BinarySearchComponent } from './binary-search.component';
import { ChipsComponent } from '../shared/ui/chips/chips.component';
import { ChipComponent } from '../shared/ui/chip/chip.component';
import { InputComponent } from '../shared/ui/input/input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [BinarySearchComponent],
  imports: [
    CommonModule,
    BinarySearchRoutingModule,
    ChipsComponent,
    ChipComponent,
    InputComponent,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports: [BinarySearchComponent]
})
export class BinarySearchModule { }
