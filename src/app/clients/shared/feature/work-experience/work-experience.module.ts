import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperienceComponent } from './work-experience.component';
import { WorkExperienceFormModule } from '../../ui/work-experience/work-experience-form.module';
import { WorkExperienceCardModule } from '../../ui/work-experience-card/work-experience-card.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [WorkExperienceComponent],
  imports: [
    CommonModule,
    WorkExperienceFormModule,
    WorkExperienceCardModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [WorkExperienceComponent]
})
export class WorkExperienceModule { }
