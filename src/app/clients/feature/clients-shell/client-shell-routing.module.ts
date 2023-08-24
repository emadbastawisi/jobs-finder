import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: 'signup', loadChildren: () => import('../clients-signup/client-signup.module').then(m => m.ClientSignupModule)
  },
  {
    path: 'login', loadChildren: () => import('../clients-login/client-login.module').then(m => m.ClientLoginModule)
  },
  {
    path: 'categories', loadChildren: () => import('../clients-categories/clients-categories.module').then(m => m.ClientsCategoriesModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientShellRoutingModule { }
