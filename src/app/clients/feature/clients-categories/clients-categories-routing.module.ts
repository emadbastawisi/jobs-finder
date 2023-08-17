import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsCategoriesComponent } from './clients-categories.component';

const routes: Routes = [
  {
    path: '', component: ClientsCategoriesComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsCategoriesRoutingModule { }
