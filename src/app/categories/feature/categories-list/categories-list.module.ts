import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesListRoutingModule } from './categories-list-routing.module';
import { CategoriesListComponent } from './categories-list.component';
import { CategoriesListItemModule } from '../../ui/categories-list-item/categories-list-item.module';

import { JobListModule } from 'src/app/jobs/feature/jobs-list/jobs-list.module';

@NgModule({
  declarations: [CategoriesListComponent],
  imports: [
    CommonModule,
    CategoriesListRoutingModule,
    CategoriesListItemModule,
    JobListModule,
  ],
  exports: [CategoriesListComponent],
})
export class CategoriesListModule {}
