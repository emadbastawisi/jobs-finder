import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Job } from '../utils/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  http = inject(HttpClient);

  constructor() { }

  headObj = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  // Refactored getJobs function to improve readability and adhere to code standards
  getAllJobs(keywords: any): Observable<Job[]> {
    const url = `${environment.api.address}/jobs`; // Construct API endpoint URL
    const headers = this.headObj; // Assign headers object to a variable
    return this.http.post<Job[]>(url, keywords, { headers });
  }
  // refreshJobs() {
  //   const url = `${environment.api.address}/jobs`; // Construct API endpoint URL
  //   const headers = this.headObj; // Assign headers object to a variable
  //   return this.http.get(url, { headers });
  // }
  getClientJobs(selectedKeywords: string): Observable<Job[]> {
    const url = `${environment.api.address}/jobs/${selectedKeywords}`; // Construct API endpoint URL
    const headers = this.headObj; // Assign headers object to a variable
    return this.http.get<Job[]>(url, { headers });
  }
}
