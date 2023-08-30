import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AcceptValidator,
  MaxSizeValidator,
} from '@angular-material-components/file-input';

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
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
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
