import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Keywords } from '../../utils/models/kewords.model';

@Component({
  selector: 'app-clients-categories-list',
  templateUrl: './clients-categories-list.component.html',
  styleUrls: ['./clients-categories-list.component.css']
})
export class ClientsCategoriesListComponent {

  @Input() keywords: Keywords = {
    keywords: ''
  }
  @Output() newkeywordEvent = new EventEmitter<string>();
  selectedKeywords: Keywords[] = [];

  UpdateSelectedKeywords(selectedKeywords: string) {
    this.newkeywordEvent.emit(selectedKeywords);
  }

  getSelectedCategoriesValues() {
    return this.selectedKeywords.map(keyword => keyword.keywords).join(',');
  }

  value: any;
  onChange(event: any) {
    this.value = event.value;
    console.log(this.value);
  }
}
