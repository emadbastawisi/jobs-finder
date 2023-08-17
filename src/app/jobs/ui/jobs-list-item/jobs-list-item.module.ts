import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsListItemComponent } from './jobs-list-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [JobsListItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [JobsListItemComponent]
})
export class JobsListItemModule {

}
