import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionSortComponent } from './selection-sort.component';

const routes: Routes = [
  {
    path: '',
    component: SelectionSortComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectionSortRoutingModule { }
