import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ClientsCategoriesListComponent } from './clients-categories-list.component';



@NgModule({
  declarations: [ClientsCategoriesListComponent],
  imports: [
    CommonModule,
    MatChipsModule
  ],
  exports: [
    ClientsCategoriesListComponent
  ]
})
export class ClientsCategoriesListModule { }
