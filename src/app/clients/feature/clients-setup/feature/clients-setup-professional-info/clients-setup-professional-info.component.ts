import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as list from '../../utils/list';
import { Store } from '@ngrx/store';
import { selectUserProfileSetup } from 'src/app/store//setup/setup.reducers';
import { setupActions } from 'src/app/store/setup/setup.actions';
import { CV, UserWorkExperience } from 'src/app/clients/utils/models/userProfile.models';
import { ClientsService } from 'src/app/clients/data-access/clients.service';
import { MatDialog } from '@angular/material/dialog';
import { WorkExperienceFormComponent } from 'src/app/clients/shared/ui/work-experience/work-experience-form.component';

@Component({
  selector: 'app-clients-setup-professional-info',
  templateUrl: './clients-setup-professional-info.component.html',
  styleUrls: ['./clients-setup-professional-info.component.css'],
})
export class ClientsSetupProfessionalInfoComponent {
  experienceTypeList = list.experienceTypeList;
  jobCategoryList = list.categoriesList;
  yearsOfExperienceList = list.yearsOfExperienceList;
  educationLevelList = list.educationLevelList;
  languageList = list.languageList;
  proficiencyLevelList = list.proficiencyLevelList;
  skillsList = ['angular', 'python'];

  store = inject(Store);
  fb = inject(FormBuilder);
  userProfile$ = this.store.selectSignal(selectUserProfileSetup);

  clientsService = inject(ClientsService);

  professionalInfoForm: FormGroup;
  constructor() {
    this.professionalInfoForm = this.fb.group({
      years_of_experience: [null, Validators.required],
      education_level: ['', Validators.required],
      degree_details: this.fb.group({
        field_of_study: ['', Validators.required],
        university: ['', Validators.required],
        degree_year: ['', Validators.required],
        degree_grade: ['', Validators.required]
      }),
      highschool_details: this.fb.group({
        school_name: ['', Validators.required],
        certificate_name: ['', Validators.required],
        language_of_study: ['', Validators.required],
        graduation_year: ['', Validators.required],
        highschool_grade: ['', Validators.required]
      }),
      language: this.fb.group({
        id: [],
        language_name: ['', Validators.required],
        proficiency: ['', Validators.required]
      }),
      skills: [[], Validators.required]
    });
  }


  getControl(controlName: string): FormControl {
    return this.professionalInfoForm.get(controlName) as FormControl;
  }
  getFormGroup(groupName: string): FormGroup {
    return this.professionalInfoForm.get(groupName) as FormGroup;
  }
  getFormGroupControl(groupName: string, controlName: string): FormControl {
    return this.getFormGroup(groupName).get(controlName) as FormControl;
  }

  addLanguageForm() {
    this.professionalInfoForm.addControl(
      'language',
      new FormGroup({
        id: new FormControl(),
        language_name: new FormControl('', Validators.required),
        proficiency: new FormControl('', Validators.required),
      })
    )
  }
  removeLanguageForm() {
    this.professionalInfoForm.removeControl('language');
  }

  onEducationLevelChange(event: any) {
    console.log(event);

    if (event === 'High School') {
      this.professionalInfoForm.removeControl('degree_details');
      this.professionalInfoForm.addControl(
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
      this.professionalInfoForm.removeControl('highschool_details');
      this.professionalInfoForm.addControl(
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



  personalInfoFormSubmit() {

  }
}

