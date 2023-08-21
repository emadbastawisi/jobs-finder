import { Component, OnInit, inject } from '@angular/core';

import { ClientsService } from '../../data-access/clients.service';

@Component({
  selector: 'app-clients-categories',
  templateUrl: './clients-categories.component.html',
  styleUrls: ['./clients-categories.component.css']
})
export class ClientsCategoriesComponent implements OnInit {
  clientsService = inject(ClientsService)

  updateSelectedKeyword(newSelectedCategory: string) {
    this.selectedcategories = newSelectedCategory;
  }

  selectedcategories: string = '';
  ngOnInit(): void {
    this.clientsService.getClientCategories()
  }

  addNewCategory(category: string) {
    this.clientsService.addClientCategory(category)
  }
  deleteSelected() {
    this.clientsService.deleteClientCategory(this.selectedcategories)
  }
}
