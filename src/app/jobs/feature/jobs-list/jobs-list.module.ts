import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListRoutingModule } from './jobs-list-routing.module';
import { JobsListItemModule } from '../../ui/jobs-list-item/jobs-list-item.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { JobsListComponent } from './jobs-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [JobsListComponent],
  imports: [
    CommonModule,
    JobListRoutingModule,
    MatGridListModule,
    JobsListItemModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  exports: [JobsListComponent]
})
export class JobListModule { }
