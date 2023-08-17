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
      value: 'Angular',
      src: '../../assets/angular.svg'
    },
    {
      value: 'React',
      src: '../../assets/angular.svg'
    },
    {
      value: 'Python',
      src: '../../assets/angular.svg'
    },
    {
      value: 'Vue',
      src: '../../assets/angular.svg'
    },
    {
      value: 'Javascript',
      src: '../../assets/angular.svg'
    },

  ]
  addCategory(newSelectedCategory: string) {
    this.selectedcategories = newSelectedCategory;
    console.log(this.selectedcategories);
  }
  selectedcategories: string = '';

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
