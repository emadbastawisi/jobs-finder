import { Component, Input } from '@angular/core';
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

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
  getFormGroup(groupName: string): FormGroup {
    return this.FormGroup.get(groupName) as FormGroup;
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
}
