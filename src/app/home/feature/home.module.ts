import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ClientsCategoriesModule } from 'src/app/clients/feature/clients-categories/clients-categories.module';
import { CategoriesListModule } from 'src/app/categories/feature/categories-list/categories-list.module';
import { JobListModule } from 'src/app/jobs/feature/jobs-list/jobs-list.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClientsCategoriesModule,
    CategoriesListModule,
    JobListModule,

  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {

}
