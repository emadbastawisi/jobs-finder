
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserWorkExperience } from 'src/app/clients/utils/models/userProfile.models';

@Component({
  selector: 'app-work-experience-card',
  templateUrl: './work-experience-card.component.html',
  styleUrls: ['./work-experience-card.component.css']
})
export class WorkExperienceCardComponent implements OnInit {
  @Input() workExperience!: UserWorkExperience;
  @Output() edit = new EventEmitter<UserWorkExperience>();
  @Output() delete = new EventEmitter<number>();
  startDate!: string;
  endDate!: string;
  workTime!: string;
  getTimeDifference(isoString1: string, isoString2: string): string {
    const date1 = new Date(isoString1);
    const date2 = new Date(isoString2);
    const timeDifference = Math.abs(date2.getTime() - date1.getTime());
    const days = timeDifference / (1000 * 3600 * 24);
    const months = days / 30.44;
    const years = months / 12;

    if (years >= 1) {
      return `${years.toFixed(2)} years`;
    } else {
      return `${months.toFixed(2)} months`;
    }
  }

  convertIsoString(isoString: string): string {
    const date = new Date(isoString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  ngOnInit(): void {
    if (this.workExperience) {
      this.startDate = this.convertIsoString(this.workExperience.start_date!);
      if (this.workExperience.end_date === null) {
        this.workTime = this.getTimeDifference(this.workExperience.start_date, new Date().toISOString());
        this.endDate = 'present'
      } else {
        this.endDate = this.convertIsoString(this.workExperience.end_date!);
        this.workTime = this.getTimeDifference(this.workExperience.start_date, this.workExperience.end_date!);
      }
    }
  }

  onEditClick() {
    this.edit.emit(this.workExperience);
  }
  onDeleteClick() {
    this.delete.emit(this.workExperience.id);
  }
}
