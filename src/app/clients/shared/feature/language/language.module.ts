import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './language.component';
import { LanguageCardModule } from '../../ui/language-card/language-card.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LanguageFormModule } from '../../ui/language-form/language-form.module';



@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    LanguageCardModule,
    LanguageFormModule,
    MatDialogModule
  ],
  exports: [LanguageComponent]
})
export class LanguageModule { }
