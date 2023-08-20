import { Component, OnInit, inject } from '@angular/core';
import { category } from '../../utils/category.model';

import { CategoriesService } from '../../data-access/categories.service';
// import { JobsService } from 'src/app/jobs/data-access/jobs.service';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categoriesService = inject(CategoriesService)
  // jobService = inject(JobsService)
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
    // this.jobService.selectedKeywords.set(this.SelectedCategories);
    // this.jobService.getClientJobs();
  }
  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => {
        console.log(data)
      } 
    )
  }
}
