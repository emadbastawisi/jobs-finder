import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChipsComponent } from '../shared/ui/chips/chips.component';
import { ChipComponent } from '../shared/ui/chip/chip.component';
import { InputComponent } from '../shared/ui/input/input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { SimpleSearchRoutingModule } from './simple-search-routing.module';
import { SimpleSearchComponent } from './simple-search.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [SimpleSearchComponent],
  imports: [
    CommonModule,
    SimpleSearchRoutingModule,
    MatButtonModule,
    MatChipsModule,
    ChipsComponent,
    ChipComponent,
    InputComponent,
    MatSnackBarModule
  ],
  exports: [SimpleSearchComponent]
})
export class SimpleSearchModule { }
