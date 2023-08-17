import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsCategoriesRoutingModule } from './clients-categories-routing.module';
import { ClientsCategoriesComponent } from './clients-categories.component';
import { ClientsCategoriesListModule } from '../../ui/clients-categories-list/clients-categories-list.module';
import { JobListModule } from 'src/app/jobs/feature/jobs-list/jobs-list.module';
import { ClientsCategoriesAddModule } from '../../ui/clients-categories-add/clients-categories-add.module';


@NgModule({
  declarations: [
    ClientsCategoriesComponent
  ],
  imports: [
    CommonModule,
    ClientsCategoriesRoutingModule,
    ClientsCategoriesListModule,
    JobListModule,
    ClientsCategoriesAddModule
  ],
  exports: [ClientsCategoriesComponent]
})
export class ClientsCategoriesModule { }
