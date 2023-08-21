import { Component, Input } from '@angular/core';
import { Job } from '../../utils/job.model';

@Component({
  selector: 'app-jobs-list-item',
  templateUrl: './jobs-list-item.component.html',
  styleUrls: ['./jobs-list-item.component.css']
})
export class JobsListItemComponent {

  @Input() job: Job =
    {
      title: '',
      company: '',
      location: '',
      type: '',
      skills: '',
      link: '',
      created_at: ''
    }
}
