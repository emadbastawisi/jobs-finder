import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as list from '../../utils/models/list'

@Component({
  selector: 'app-clients-setup-career-interests',
  templateUrl: './clients-setup-career-interests.component.html',
  styleUrls: ['./clients-setup-career-interests.component.css'],
})
export class ClientsSetupCareerInterestsComponent {
  careerLevelList = list.careerLevelList;
  jobTypeList = list.jobTypeList;
  categoriesList = list.categoriesList;

  @Input() FormGroup: FormGroup = new FormGroup({});

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
}
