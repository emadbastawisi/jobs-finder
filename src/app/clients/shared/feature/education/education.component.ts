import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { educationLevelList } from 'src/app/clients/feature/clients-setup/utils/list';
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  store = inject(Store);
  fb = inject(FormBuilder);
  degree_details: FormGroup;
  highschool_details: FormGroup;
  education_level: FormControl;
  educationLevelList = educationLevelList;
  constructor() {
    this.education_level = new FormControl('', Validators.required);
    this.degree_details = this.fb.group({
      degree: [''],
      field_of_study: ['', Validators.required],
      university: ['', Validators.required],
      degree_year: ['', Validators.required],
      degree_grade: ['', Validators.required]
    }),
      this.highschool_details = this.fb.group({
        degree: [''],
        school_name: ['', Validators.required],
        certificate_name: ['', Validators.required],
        language_of_study: ['', Validators.required],
        graduation_year: ['', Validators.required],
        highschool_grade: ['', Validators.required]
      })
  }
  onEducationLevelChange(event: any) {
    this.degree_details.controls['degree'].setValue(event);
    this.highschool_details.controls['degree'].setValue(event);
  }


}
