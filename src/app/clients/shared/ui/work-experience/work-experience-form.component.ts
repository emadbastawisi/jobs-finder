import { I } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as list from '../../../feature/clients-setup/utils/list';

@Component({
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.css'],
})
export class WorkExperienceFormComponent {
  @Input() FormGroup!: FormGroup;
  experienceTypeList = list.experienceTypeList;
  jobCategoryList = list.categoriesList;
  yearsOfExperienceList = list.yearsOfExperienceList;

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
  onWorkThereChange(event: any) {
    console.log(event);
    if (event.checked) {
      this.FormGroup.removeControl('end_date');
    } else {
      this.FormGroup.addControl('end_date', new FormControl(''));
    }
  }
}
