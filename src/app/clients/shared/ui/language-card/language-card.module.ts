import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageCardComponent } from './language-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    LanguageCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [LanguageCardComponent]
})
export class LanguageCardModule { }
