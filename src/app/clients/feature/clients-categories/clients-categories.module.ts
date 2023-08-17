import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsCategoriesRoutingModule } from './clients-categories-routing.module';
import { ClientsCategoriesComponent } from './clients-categories.component';
import { ClientsCategoriesListModule } from '../../ui/clients-categories-list/clients-categories-list.module';


@NgModule({
  declarations: [
    ClientsCategoriesComponent
  ],
  imports: [
    CommonModule,
    ClientsCategoriesRoutingModule,
    ClientsCategoriesListModule
  ]
})
export class ClientsCategoriesModule { }
