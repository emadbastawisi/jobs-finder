import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsSetupCareerInterestsComponent } from './clients-setup-career-interests.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';



@NgModule({
  declarations: [
    ClientsSetupCareerInterestsComponent
  ],
  imports: [
    CommonModule,
    InputComponent
  ],
  exports: [
    ClientsSetupCareerInterestsComponent
  ]
})
export class ClientsSetupCareerInterestsModule { }
