import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from './tool-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [ToolBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    MatSnackBarModule

  ],
  exports: [
    ToolBarComponent
  ]
})
export class ToolBarModule { }
