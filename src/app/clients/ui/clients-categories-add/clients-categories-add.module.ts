import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsCategoriesAddComponent } from './clients-categories-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';






@NgModule({
  declarations: [ClientsCategoriesAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,

    
  ],
  exports: [ClientsCategoriesAddComponent]
})
export class ClientsCategoriesAddModule { }
