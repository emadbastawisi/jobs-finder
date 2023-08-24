import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsCategoriesComponent } from './clients-categories.component';
import { authGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientsCategoriesComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsCategoriesRoutingModule { }
