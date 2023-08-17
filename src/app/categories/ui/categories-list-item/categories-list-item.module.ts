import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListItemComponent } from './categories-list-item.component';
import { MatChipsModule } from '@angular/material/chips';




@NgModule({
  declarations: [CategoriesListItemComponent],
  imports: [
    CommonModule,
    MatChipsModule,
  ],
  exports: [CategoriesListItemComponent]
})
export class CategoriesListItemModule { }
