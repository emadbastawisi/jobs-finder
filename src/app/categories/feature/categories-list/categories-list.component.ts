import { Component, OnInit, inject } from '@angular/core';
import { category } from '../../utils/category.model';

import { CategoriesService } from '../../data-access/categories.service';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  private categoriesService = inject(CategoriesService)
  categories: category[] = [
    {
      name: 'Angular',
      img: '../../assets/angular.svg'
    },
    {
      name: 'React',
      img: '../../assets/angular.svg'
    },
    {
      name: 'Python',
      img: '../../assets/angular.svg'
    },
    {
      name: 'Vue',
      img: '../../assets/angular.svg'
    },
    {
      name: 'Javascript',
      img: '../../assets/angular.svg'
    },
  ]
  SelectedCategories: string = '';

  updateSelected(newSelectedCategories: string) {
    this.SelectedCategories = newSelectedCategories;
  }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
