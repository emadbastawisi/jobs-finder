import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { category } from '../utils/category.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);


  // get categories from api
  getCategories(): Observable<string> {
    const url = `${environment.api.address}/search`; // Construct API endpoint URL

    return this.http.get<string>(url);
  }
  // add categories to the api
  addCategory(category: category): Observable<string> {
    const url = `${environment.api.address}/category`; // Construct API endpoint URL
    return this.http.post<string>(url, category);
  }

  // delete categories from an api
  deleteCategory(category: category): Observable<string> {
    const url = `${environment.api.address}/category`; // Construct API endpoint URL
    return this.http.patch<string>(url, category);
  }

}
