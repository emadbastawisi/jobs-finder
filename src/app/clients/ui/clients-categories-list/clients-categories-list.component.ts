import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { JobsService } from 'src/app/jobs/data-access/jobs.service';

@Component({
  selector: 'app-clients-categories-list',
  templateUrl: './clients-categories-list.component.html',
  styleUrls: ['./clients-categories-list.component.css']
})
export class ClientsCategoriesListComponent {
  jobsService = inject(JobsService);

  // get the keywords from the client-categories component
  @Input() keywords: string = '';
  // send the selected keywords to the client-categories component
  @Output() newkeywordEvent = new EventEmitter<string>();

  // send the selected keywords to client-categories component when the selection changes
  onChange(event: any) {
    const selectedKeywords = event.value.join(',');
    this.newkeywordEvent.emit(selectedKeywords);
  }
}
