import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinarySearchComponent } from './binary-search.component';

const routes: Routes = [
  {
    path: '',
    component: BinarySearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BinarySearchRoutingModule { }
