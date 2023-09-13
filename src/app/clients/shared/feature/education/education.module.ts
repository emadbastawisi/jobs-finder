import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { ChipsComponent } from 'src/app/shared/ui/chips/chips.component';
import { DegreeDetailsFormModule } from '../../ui/degree-details-form/degree-details-form.module';



@NgModule({
  declarations: [EducationComponent],
  imports: [
    CommonModule,
    ChipsComponent,
    DegreeDetailsFormModule
  ],
  exports: [EducationComponent]
})
export class EducationModule { }
