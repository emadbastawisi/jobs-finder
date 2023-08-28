import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients-setup-career-interests',
  templateUrl: './clients-setup-career-interests.component.html',
  styleUrls: ['./clients-setup-career-interests.component.css'],
})
export class ClientsSetupCareerInterestsComponent {
  careerLevelList = [
    'Student',
    'Entry Level',
    'Experienced',
    'Manager',
    'Senior Management',
    'Not specified',
  ];
  jobTypeList = [
    'Full Time',
    'Part Time',
    'Freelance',
    'Internship',
    'Temporary',
    'Shift Based',
    'Work From Home',
    'Volunteering',
    'Student Activity',
  ];
  categoriesList = [
    'Analyst/Research',
    'Administration',
    'Accounting/Finance',
    ' Banking',
    ' C - Level Executive / GM / Director',
    ' Creative / Design / Art',
    ' Business Development',
    ' Education / Teaching',
    ' Engineering - Oil & Gas / Energy',
    ' Engineering - Mechanical / Electrical',
    ' Engineering - Construction / Civil / Architecture',
    ' Engineering - Other',
    ' Fashion',
    ' Engineering - Telecom / Technology',
    ' Human Resources',
    ' Hospitality / Hotels / Food Services',
    ' Installation / Maintenance / Repair',
    ' Logistics / Supply Chain',
    ' Legal',
    ' Manufacturing / Production',
    ' Media / Journalism / Publishing',
    ' Marketing / PR / Advertising',
    ' IT / Software Development',
    ' Medical / Healthcare',
    ' Other',
    ' Pharmaceutical',
    ' Operations / Management',
    ' Project / Program Management',
    ' Purchasing / Procurement',
    ' Sales / Retail',
    ' R & D / Science',
    ' Strategy / Consulting',
    ' Tourism / Travel',
    ' Training / Instructor',
    ' Writing / Editorial',
    ' Sports and Leisure',
    ' Quality',
    ' Customer Service / Support',
  ];

  @Input() FormGroup: FormGroup = new FormGroup({});

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
}
