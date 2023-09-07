import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperienceCardComponent } from './work-experience-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    WorkExperienceCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    WorkExperienceCardComponent
  ]
})
export class WorkExperienceCardModule { }
