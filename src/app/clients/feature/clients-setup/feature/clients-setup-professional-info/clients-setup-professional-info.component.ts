import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as list from '../../utils/list';
import { Store } from '@ngrx/store';
import { selectUserProfileSetup } from 'src/app/store//setup/setup.reducers';
import { setupActions } from 'src/app/store/setup/setup.actions';
import { CV } from 'src/app/clients/utils/models/userProfile.models';

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
  userProfile$ = this.store.select(selectUserProfileSetup);

  professionalInfoForm: FormGroup;

  constructor() {
    this.professionalInfoForm = this.fb.group({
      cv: [
        null,
        [
          Validators.required,
          this.fileTypeValidator(['pdf', 'doc', 'docx']),
          this.fileSizeValidator(5 * 1024 * 1024),
          this.fileCountValidator(1)
        ]
      ],
      years_of_experience: [null, Validators.required],
      work_experience: this.fb.group({
        job_title: ['', Validators.required],
        company: ['', Validators.required],
        job_category: [[], Validators.required],
        experience_type: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        work_there: [false]
      }),
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
  onYearsOfExperienceChange(event: any) {
    if (event === 'No Experience') {
      this.professionalInfoForm.removeControl('work_experience');
    } else {
      this.professionalInfoForm.addControl(
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


  fileTypeValidator(allowedExtensions: string[]): ValidatorFn {
    return (control: AbstractControl) => {
      const files = control.value as FileList;
      if (!files) return null;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const extension = file!.name.split('.').pop()!.toLowerCase();
        if (!allowedExtensions.includes(extension)) {
          return { invalidFileType: true };
        }
      }
      return null;
    };
  }

  fileSizeValidator(maxSizeInBytes: number): ValidatorFn {
    return (control: AbstractControl) => {
      const files = control.value as FileList;
      if (!files) return null;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file!.size > maxSizeInBytes) {
          return { invalidFileSize: true };
        }
      }
      return null;
    };
  }
  fileCountValidator(maxFileCount: number): ValidatorFn {
    return (control: AbstractControl) => {
      const files = control.value as FileList;
      if (!files) return null;

      if (files.length > maxFileCount) {
        return { invalidFileCount: true };
      }
      return null;
    };
  }

  onCvChange(event: any) {
    if (event === 'add') {
      const CV: CV = {
        cv_name: this.getControl('cv').value[0].name,
        cv_file: this.getControl('cv').value[0]
      };
      console.log(CV);
      this.store.dispatch(setupActions.addCV({ request: CV }));
    }
    if (event === 'remove') {
      // this.store.dispatch(setupActions.deleteCV());
    }
  }
}
