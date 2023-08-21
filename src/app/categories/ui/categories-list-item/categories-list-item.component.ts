import { Component, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { category } from '../../utils/category.model';
import { ThemePalette } from '@angular/material/core';
import { JobsService } from 'src/app/jobs/data-access/jobs.service';



export interface ChipColor {
  name: string;
  color: ThemePalette;
}


@Component({
  selector: 'app-categories-list-item',
  templateUrl: './categories-list-item.component.html',
  styleUrls: ['./categories-list-item.component.css']
})
export class CategoriesListItemComponent {
  jobsService = inject(JobsService);
  @Input() set categories(value: category[] | undefined) {
    this.cats.set(value);
  }
  @Output() newCategoryEvent = new EventEmitter<string>();


  // cats short for categories
  cats = signal<category[] | undefined>([])
  selectedCats = signal<category[]>([])
  selectedList = computed(() => this.selectedCats().map(category => category.name).join(','));

  toggleCat(category: category) {
    if (this.selectedCats().includes(category)) {
      this.selectedCats.update(selectedCat => selectedCat.filter(selectedCat => selectedCat.name !== category.name));
      this.newCategoryEvent.emit(this.selectedList());
    } else {
      this.selectedCats.mutate(selectedCats => selectedCats.push(category));
      this.newCategoryEvent.emit(this.selectedList());
    }
  }

}





