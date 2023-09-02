import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-clients-setup',
  templateUrl: './clients-setup.component.html',
  styleUrls: ['./clients-setup.component.css'],
})
export class ClientsSetupComponent {
  careerInterestsForm: FormGroup = new FormGroup({
    careerLevel: new FormControl('', Validators.required),
    jobType: new FormControl('', Validators.required),
    categories: new FormControl([], Validators.required),
    minSalary: new FormControl(null, Validators.required),
    hideSalary: new FormControl(false),
  });

  generalInfoForm: FormGroup = new FormGroup({
    first_name: new FormControl<string>('', Validators.required),
    last_name: new FormControl<string>('', Validators.required),
    birthdate: new FormControl(null, Validators.required),
    gender: new FormControl<string>('', Validators.required),
    nationality: new FormControl<string>('', Validators.required),
    phone: new FormControl<string>('', Validators.required),
    address: new FormGroup({
      country: new FormControl('', Validators.required),
    }),
  });

  professionalInfoForm: FormGroup = new FormGroup({
    cv: new FormControl(null, [
      Validators.required,
      this.fileTypeValidator(['pdf', 'doc', 'docx']),
      this.fileSizeValidator(5 * 1024 * 1024),
      this.fileCountValidator(1),
    ]),
    years_of_experience: new FormControl(null, Validators.required),
    work_experience: new FormGroup({
      job_title: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      job_category: new FormControl([], Validators.required),
      experience_type: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      work_there: new FormControl(false),
    }),
    education_level: new FormControl('', Validators.required),
    degree_details: new FormGroup({
      field_of_study: new FormControl('', Validators.required),
      university: new FormControl('', Validators.required),
      degree_year: new FormControl('', Validators.required),
      degree_grade: new FormControl('', Validators.required),
    }),
    highschool_details: new FormGroup({
      school_name: new FormControl('', Validators.required),
      certificate_name: new FormControl('', Validators.required),
      language_of_study: new FormControl('', Validators.required),
      graduation_year: new FormControl('', Validators.required),
      highschool_grade: new FormControl('', Validators.required),
    }),
    language: new FormGroup({
      language_name: new FormControl('', Validators.required),
      proficiency: new FormControl('', Validators.required),
    }),
    skills: new FormControl([], Validators.required),
  });

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
}
