import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as list from '../../shared/utils/list';

@Component({
  selector: 'app-clients-setup-professional-info',
  templateUrl: './clients-setup-professional-info.component.html',
  styleUrls: ['./clients-setup-professional-info.component.css'],
})
export class ClientsSetupProfessionalInfoComponent {
  @Input() FormGroup!: FormGroup;

  experienceTypeList = list.experienceTypeList;
  jobCategoryList = list.categoriesList;
  yearsOfExperienceList = list.yearsOfExperienceList;
  educationLevelList = list.educationLevelList;
  languageList = list.languageList;
  proficiencyLevelList = list.proficiencyLevelList;
  skillsList = ['angular', 'python'];

  constructor() {}

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
  getFormGroup(groupName: string): FormGroup {
    return this.FormGroup.get(groupName) as FormGroup;
  }
  getFormGroupControl(groupName: string, controlName: string): FormControl {
    return this.getFormGroup(groupName).get(controlName) as FormControl;
  }
  onYearsOfExperienceChange(event: any) {
    if (event === 'No Experience') {
      this.FormGroup.removeControl('work_experience');
    } else {
      this.FormGroup.addControl(
        'work_experience',
        new FormGroup({
          job_title: new FormControl('', Validators.required),
          company: new FormControl('', Validators.required),
          job_category: new FormControl([], Validators.required),
          experience_type: new FormControl('', Validators.required),
          start_date: new FormControl('', Validators.required),
          end_date: new FormControl('', Validators.required),
          work_there: new FormControl(false),
        })
      );
    }
  }
  onEducationLevelChange(event: any) {
    console.log(event);

    if (event === 'High School') {
      this.FormGroup.removeControl('degree_details');
      this.FormGroup.addControl(
        'highschool_details',
        new FormGroup({
          school_name: new FormControl('', Validators.required),
          certificate_name: new FormControl('', Validators.required),
          language_of_study: new FormControl('', Validators.required),
          graduation_year: new FormControl('', Validators.required),
          highschool_grade: new FormControl('', Validators.required),
        })
      );
    } else {
      this.FormGroup.removeControl('highschool_details');
      this.FormGroup.addControl(
        'degree_details',
        new FormGroup({
          field_of_study: new FormControl('', Validators.required),
          university: new FormControl('', Validators.required),
          degree_year: new FormControl('', Validators.required),
          degree_grade: new FormControl('', Validators.required),
        })
      );
    }
  }
}
