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
  now = new Date().toUTCString()

  ngOnInit(): void {

  }
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
