import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsSetupComponent } from './clients-setup.component';
import { authGuard } from 'src/app/auth/auth.guard';
import { Store } from '@ngrx/store';
import { setupActions } from '../../data-access/store/actions';

const routes: Routes = [
  {
    path: '',
    component: ClientsSetupComponent,
    canActivate: [
      authGuard,
      () => {
        inject(Store).dispatch(setupActions.getUserProfile());
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsSetupRoutingModule {}
