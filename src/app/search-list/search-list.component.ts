import { Component } from '@angular/core';
import { GetJobsService } from '../services/get-jobs.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent {

  constructor(private jobsService: GetJobsService) { }
  keywords: string[] = ['python', 'react']
  search_keyword: any = { "search_keyword": 'python,react,angular,senior' }
  selectedSearchWords: string[] = [];
  value = 'Clear me';

  onAddSearchWord(searchWord: string) {
    this.keywords.push(searchWord);
    console.log(this.keywords)
  }
  onRemoveSearchWords(searchWordsToRemove: string[]) {
    this.keywords = this.keywords.filter((word) => !searchWordsToRemove.includes(word));
  }

  ngOnInit(): void {
    console.log(this.keywords)
  }
  jobs: any = [];
  now = new Date().toUTCString()

  onGetJobs() {
    this.jobsService.getJobs(this.search_keyword).subscribe(
      (data) => {
        console.log(data)
        this.jobs = data
      },
      (error) => console.log(error)
    );
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

