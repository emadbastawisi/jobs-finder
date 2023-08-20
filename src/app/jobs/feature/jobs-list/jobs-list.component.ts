import { Component, Input, Signal, inject, signal } from '@angular/core';
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
}


