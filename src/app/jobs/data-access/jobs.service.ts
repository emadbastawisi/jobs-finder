import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Job } from '../utils/job.model';
import { PageEvent } from '@angular/material/paginator';
import { JobsState } from '../utils/jobsState.model';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  http = inject(HttpClient);
  state = signal<JobsState>({
    jobs: [],
    jobsSlice: [],
    pageNumber: 0,
    error: null,
    status: "success"
  });
  //selectors
  jobs = computed(() => this.state().jobs);
  jobsSlice = computed(() => this.state().jobsSlice);
  pageNumber = computed(() => this.state().pageNumber);
  error = computed(() => this.state().error);
  status = computed(() => this.state().status);

  resetState(): void {
    this.state.set({
      jobs: [],
      jobsSlice: [],
      pageNumber: 0,
      error: null,
      status: "success"
    })
  }
  getClientJobs(selectedKeywords: string): void {
    this.resetState();
    if (selectedKeywords === '') {
      this.state.mutate((state) => {
        state.status = "error";
        state.error = "Please select a category";
      });
      return;
    };
    this.state.mutate((state) => { state.status = "loading"; })

    const url = `${environment.api.address}/jobs/${selectedKeywords}`;
    this.http.get<Job[]>(url).pipe(
      map((data: Job[]) => data.map(item => ({ ...item, created_at: this.posted_at(item.created_at) })))
    )
      .subscribe(
        (data) => {
          this.state.set({
            jobs: data,
            jobsSlice: data.slice(0, 10),
            pageNumber: 0,
            error: null,
            status: "success"
          });
        },
        (error) => {
          this.state.mutate((state) => {
            state.status = "error";
            state.error = "couldn't connect to server";
          });
        });
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

  // function to modify created_at date to posted_at format
  posted_at(date_string: string): string {
    const input_date = new Date(date_string);
    const current_time = new Date();
    const time_difference = current_time.getTime() - input_date.getTime();
    const hours_difference = time_difference / (1000 * 3600);
    if (hours_difference < 24) {
      return `${Math.round(hours_difference)} hours ago`;
    } else {
      const days_difference = hours_difference / 24;
      return `${Math.round(days_difference)} days ago`;
    }
  }

}
