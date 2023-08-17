import { Component, OnInit, inject } from '@angular/core';
import { Keywords } from '../../utils/models/kewords.model';
import { ClientsService } from '../../data-access/clients.service';

@Component({
  selector: 'app-clients-categories',
  templateUrl: './clients-categories.component.html',
  styleUrls: ['./clients-categories.component.css']
})
export class ClientsCategoriesComponent implements OnInit {
  private keywordsService = inject(ClientsService)
  keywords: Keywords = {
    keywords: '',
  }
  addKeyword(newSelectedCategory: string) {
    this.selectedcategories = newSelectedCategory;
    console.log(this.selectedcategories);
  }
  selectedcategories: string = '';

  ngOnInit(): void {
    this.keywordsService.getKeywords().subscribe((keywords) => {
      this.keywords = keywords
    }
    )
  }

}
