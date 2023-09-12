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
  dialog = inject(MatDialog);
  userProfile$ = this.store.selectSignal(selectUserProfileSetup);

  clientsService = inject(ClientsService);

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
        id: [],
        job_title: ['', Validators.required],
        company_name: ['', Validators.required],
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
          id: new FormControl(),
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

  deleteCV() {
    this.store.dispatch(setupActions.deleteCV());
  }
  getCV() {
    this.store.dispatch(setupActions.getCV());
  }

  addCV(event: any) {
    const CV: FormData = new FormData();
    CV.append('file', this.getControl('cv').value[0]);
    this.store.dispatch(setupActions.addCV({ request: CV }));
  }

  onWorkExperienceCancel() {
    this.professionalInfoForm.removeControl('work_experience');
  }
  onWorkExperienceSave(event: UserWorkExperience) {
    this.store.dispatch(setupActions.addWorkExperience({ request: event }));
  }
  onWorkExperienceEdit(workExperience: UserWorkExperience) {
    this.getFormGroup('work_experience').patchValue(workExperience);
    const dialogRef = this.dialog.open(WorkExperienceFormComponent, {
      data: { FormGroup: this.getFormGroup('work_experience') },
    })
    const updateSubscription = dialogRef.componentInstance.update.subscribe(value => {
      this.store.dispatch(setupActions.updateWorkExperience({ request: value }));
    });

    dialogRef.afterClosed().subscribe(() => {
      updateSubscription.unsubscribe();
    });
  }
  onWorkExperienceDelete(id: number) {
    this.store.dispatch(setupActions.deleteWorkExperience({ request: id }));
    this.getFormGroup('work_experience').reset();
  }
}

