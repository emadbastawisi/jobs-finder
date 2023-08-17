import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class GetJobsService {
  http = inject(HttpClient);

  constructor() { }

  headObj = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')).set('Content-Type', 'application/json');
  // getjobs function to get jobs from backend
  getJobs(keywords: any) {
    return this.http.post(environment.api.address + '/jobs', keywords, { headers: this.headObj });
  }
}
