import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsCategoriesComponent } from './clients-categories.component';
import { authGuard } from 'src/app/auth/auth.guard';
import { ClientsService } from '../../data-access/clients.service';

const routes: Routes = [
  {
    path: '',
    component: ClientsCategoriesComponent,
    canActivate: [authGuard, () => { inject(ClientsService).getClientCategories(); }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsCategoriesRoutingModule { }
