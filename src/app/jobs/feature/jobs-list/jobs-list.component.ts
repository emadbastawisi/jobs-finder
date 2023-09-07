import { Component, Input, inject, OnInit } from '@angular/core';
import { JobsService } from 'src/app/jobs/data-access/jobs.service';




@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent implements OnInit {
  // inject the jobs service
  jobsService = inject(JobsService);
  // takes selected keywords from the client-categories-list component or categories-list component
  @Input() selectedKeywords: string = '';

  ngOnInit(): void {
    this.jobsService.resetState();
  }

  onGetJobs() {
    this.jobsService.getClientJobs(this.selectedKeywords);
  }

  defaultJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}



