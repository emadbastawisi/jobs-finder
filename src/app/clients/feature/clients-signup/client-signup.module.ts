import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSignupRoutingModule } from './client-signup-routing.module';
import { ClientSignupComponent } from './client-signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from 'src/app/shared/ui/input/input.component';



@NgModule({
  declarations: [
    ClientSignupComponent
  ],
  imports: [
    CommonModule,
    ClientSignupRoutingModule,
    InputComponent,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [ClientSignupComponent]
})
export class ClientSignupModule { }
