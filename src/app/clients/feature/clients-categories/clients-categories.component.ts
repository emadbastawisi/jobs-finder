import { Component, OnInit, inject } from '@angular/core';

import { ClientsService } from '../../data-access/clients.service';

@Component({
  selector: 'app-clients-categories',
  templateUrl: './clients-categories.component.html',
  styleUrls: ['./clients-categories.component.css']
})
export class ClientsCategoriesComponent implements OnInit {
  private keywordsService = inject(ClientsService)
  keywords: string = '';


  updateSelectedKeyword(newSelectedCategory: string) {
    this.selectedcategories = newSelectedCategory;
    console.log(this.selectedcategories)
  }

  addNewKeyword(event: any) {
    this.keywordsService.addClientKeyword(event).subscribe(
      (data) => {
        this.keywords = data
      }
    )
  }
  deleteSelected() {
    this.keywordsService.deleteClientKeyword(this.selectedcategories).subscribe(
      (data :any) => {
        this.keywords = data
      }
    )
  }
  selectedcategories: string = '';
  ngOnInit(): void {
    this.keywordsService.getClientKeywords().subscribe((keywords) => {
      this.keywords = keywords
    }
    )
  }
}
