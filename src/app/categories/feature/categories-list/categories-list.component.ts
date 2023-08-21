import { Component, inject } from '@angular/core';
import { category } from '../../utils/category.model';

import { CategoriesService } from '../../data-access/categories.service';
// import { JobsService } from 'src/app/jobs/data-access/jobs.service';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  categoriesService = inject(CategoriesService)
  // jobService = inject(JobsService)
  categories: category[] = [
    {
      name: 'Angular',
      img: '../../assets/angular.svg'
    },
    {
      name: 'React',
      img: '../../assets/react.svg'
    },
    {
      name: 'Python',
      img: '../../assets/python.svg'
    },
    {
      name: 'JavaScript',
      img: '../../assets/javascript.svg'
    },
    {
      name: 'Android',
      img: '../../assets/android.svg'
    },
    {
      name: 'flutter',
      img: '../../assets/flutter.svg'
    },
    {
      name: 'sales',
      img: '../../assets/sales.svg'
    },
    {
      name: 'web',
      img: '../../assets/web.svg'
    },
  ]
  SelectedCategories: string = '';
  updateSelected(updateSelectedCat: string) {
    this.SelectedCategories = updateSelectedCat;
  }
}
