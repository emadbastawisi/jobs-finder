import { Component, Output, inject } from '@angular/core';
import { JobsService } from 'src/app/jobs/data-access/jobs.service';
import { Job } from '../../utils/job.model';



@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent {
  search_keyword: any = { "search_keyword": 'python,react,angular,senior' }
  @Output() job: Job = {
    title: '',
    company: '',
    location: '',
    type: '',
    skills: '',
    link: '',
    created_at: ''
  };
  jobs: any = [];

  jobsService = inject(JobsService);

  OnGetJobs() {
    this.jobsService.getJobs(this.search_keyword).subscribe(
      (data) => {
        console.log(data)
        this.jobs = data
      },
      (error) => console.log(error)
    );

  }
}
