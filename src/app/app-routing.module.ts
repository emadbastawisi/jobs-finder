import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: 'home',
    loadChildren: () =>
      import('./home/feature/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/feature/clients-shell/client-shell.module').then(
        (m) => m.ClientShellModule
      ),
  },

  {
    path: 'jobs',
    loadChildren: () =>
      import('./jobs/feature/jobs-shell/jobs-shell.module').then(
        (m) => m.JobsShellModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/feature/categories-shell/categories-shell.module').then(
        (m) => m.CategoriesShellModule
      ),
  },
  {
    path: 'binarySearch',
    loadChildren: () =>
      import('./binary-search/binary-search.module').then(
        (m) => m.BinarySearchModule
      ),

  },
  {
    path: 'simpleSearch',
    loadChildren: () =>
      import('./simple-search/simple-search.module').then(
        (m) => m.SimpleSearchModule
      ),
  },
  {
    path: 'selectionSort',
    loadChildren: () =>
      import('./selection-sort/selection-sort.module').then(
        (m) => m.SelectionSortModule
      ),
  },
  {
    path: 'mergeSort',
    loadChildren: () =>
      import('./merge-sort/merge-sort.module').then(
        (m) => m.MergeSortModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
