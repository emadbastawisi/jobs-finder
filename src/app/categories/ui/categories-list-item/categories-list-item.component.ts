import { Component, Input, Output, EventEmitter } from '@angular/core';
import { category } from '../../utils/category.model';

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './categories-list-item.component.html',
  styleUrls: ['./categories-list-item.component.css']
})
export class CategoriesListItemComponent {
  @Input() categories: category[] = []
  @Output() newCategoryEvent = new EventEmitter<string>();
  selectedcategories: category[] = [];

  UpdateSelectedCategories(selectedcategories: string) {
    this.newCategoryEvent.emit(selectedcategories);
  }

  toggleCategory(category: category) {
    if (this.selectedcategories.includes(category)) {
      this.selectedcategories = this.selectedcategories.filter(selectedIcon => selectedIcon !== category);
      this.UpdateSelectedCategories(this.getSelectedCategoriesValues());
    } else {
      this.selectedcategories.push(category);
      this.UpdateSelectedCategories(this.getSelectedCategoriesValues());
    }
  }

  getSelectedCategoriesValues() {
    return this.selectedcategories.map(category => category.value).join(',');
  }

  value: any;
  onChange(event: any) {
    this.value = event.value;
    console.log(this.value);
  }
  addCategory() {
    this.categories.push({ value: 'new', src: 'assets/angular.svg' });
  }
}





