import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from './cv.component';
import { InputFileComponent } from 'src/app/shared/ui/input-file/input-file.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CvComponent],
  imports: [
    CommonModule,
    InputFileComponent,
    MatButtonModule
  ],
  exports: [CvComponent]
})
export class CvModule { }
