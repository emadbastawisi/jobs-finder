import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Job } from '../utils/job.model';
import { PageEvent } from '@angular/material/paginator';
import { JobsState } from '../utils/jobsState.model';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  http = inject(HttpClient);
  // selectedKeywords = signal('');
  private state = signal<JobsState>({
    jobs: [],
    jobsSlice: [],
    pageNumber: 0,
  });

  //selectors
  jobs = computed(() => this.state().jobs);
  jobsSlice = computed(() => this.state().jobsSlice);
  pageNumber = computed(() => this.state().pageNumber);


  getClientJobs(selectedKeywords: string): void {
    if (selectedKeywords === '') {
      this.state.set({
        jobs: [],
        jobsSlice: [],
        pageNumber: 0,
      });
      return;
    }
    const url = `${environment.api.address}/jobs/${selectedKeywords}`; // Construct API endpoint URL
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')); // Assign headers object to a variable
    this.http.get<Job[]>(url, { headers }).subscribe(
      (data) => {
        this.state.set({
          jobs: data,
          jobsSlice: data.slice(0, 10),
          pageNumber: 0,
        });
      },
      (error) => console.log(error)
    );
  }

  onPageChange(event: PageEvent): void {
    const startIndex = (event.pageIndex * event.pageSize);
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.jobs().length) {
      endIndex = this.jobs().length;
    }
    this.state.mutate((state) => {
      state.jobsSlice = state.jobs.slice(startIndex, endIndex);
      state.pageNumber = event.pageIndex;
    });
  }
}



























// constructor() { }
// headObj = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
// getAllJobs(keywords: any): Observable<Job[]> {
//   const url = `${environment.api.address}/jobs`; // Construct API endpoint URL
//   const headers = this.headObj; // Assign headers object to a variable
//   return this.http.post<Job[]>(url, keywords, { headers });
// }
// getClientJobs(selectedKeywords: string): Observable<Job[]> {
//   const url = `${environment.api.address}/jobs/${selectedKeywords}`; // Construct API endpoint URL
//   const headers = this.headObj; // Assign headers object to a variable
//   return this.http.get<Job[]>(url, { headers });
// }

