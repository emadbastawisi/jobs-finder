import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { category } from '../utils/category.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);

  headObj = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')).set('Content-Type', 'application/json');
  // get categories from api
  getCategories(): Observable<string> {
    const url = `${environment.api.address}/search`; // Construct API endpoint URL
    const headers = this.headObj; // Assign headers object to a variable
    return this.http.get<string>(url, { headers });
  }
  // add categories to the api
  addCategory(category: category): Observable<string> {
    const url = `${environment.api.address}/category`; // Construct API endpoint URL
    const headers = this.headObj; // Assign headers object to a variable
    return this.http.post<string>(url, category, { headers });
  }

  // delete categories from an api
  deleteCategory(category: category): Observable<string> {
    const url = `${environment.api.address}/category`; // Construct API endpoint URL
    const headers = this.headObj; // Assign headers object to a variable
    return this.http.patch<string>(url, category, { headers });
  }

}
