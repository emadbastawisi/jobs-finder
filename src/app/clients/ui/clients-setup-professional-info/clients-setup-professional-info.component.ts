import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as list from '../../utils/models/list'


@Component({
  selector: 'app-clients-setup-professional-info',
  templateUrl: './clients-setup-professional-info.component.html',
  styleUrls: ['./clients-setup-professional-info.component.css'],
})
export class ClientsSetupProfessionalInfoComponent {
  @Input() FormGroup!: FormGroup;


  // @ViewChild(ChildComponent) childComponent: ChildComponent;
  // experience = this.getArray('experience');
  
  groupIndex = 0;
  experienceTypeList = list.experienceTypeList;
  jobCategoryList = list.categoriesList;
  yearsOfExperienceList = list.yearsOfExperienceList;

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
  get experience(): FormArray {
    return this.FormGroup.get('experience') as FormArray;
  }
  getFormGroup(index: number): FormGroup {
    return this.experience.at(index) as FormGroup;
  }
  getArrayControl(groupIndex: number, controlName: string): FormControl {
    return this.getFormGroup(groupIndex).get(controlName) as FormControl;
  }

}
