import { Component, Input, Output, inject } from '@angular/core';
import { JobsService } from 'src/app/jobs/data-access/jobs.service';
import { Job } from '../../utils/job.model';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent {
  // inject the jobs service
  jobsService = inject(JobsService);

  // takes selected keywords from the client-categories-list component or categories-list component
  @Input() selectedKeywords: string = '';

  // store the jobs we get from the api
  jobs: Job[] = [];

  pageSlice: Job[] = [];
  // get all the jobs from the api

  // get the jobs that match the selected keywords from the api
  OnGetClientSelectedJobs() {
    if (this.selectedKeywords === '') {
      this.jobs = [];
      this.pageSlice = [];
      return;
    }
    this.jobsService.getClientJobs(this.selectedKeywords).subscribe(
      (data) => {
        console.log(data)
        this.jobs = data
        this.pageSlice = this.jobs.slice(0, 10);
      },
      (error) => console.log(error)
    );
  }
  // configer pagenaition

  onPageChange(event: PageEvent) {
    const startIndex = (event.pageIndex * event.pageSize);
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.jobs.length) {
      endIndex = this.jobs.length;
    }
    this.pageSlice = this.jobs.slice(startIndex, endIndex);
  }
}


