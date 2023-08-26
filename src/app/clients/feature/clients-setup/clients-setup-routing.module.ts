import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsSetupComponent } from './clients-setup.component';

const routes: Routes = [
  {
    path: '', component: ClientsSetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsSetupRoutingModule { }
