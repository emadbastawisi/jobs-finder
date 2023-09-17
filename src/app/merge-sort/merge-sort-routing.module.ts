import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergeSortComponent } from './merge-sort.component';

const routes: Routes = [
  {
    path: '',
    component: MergeSortComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MergeSortRoutingModule { }
