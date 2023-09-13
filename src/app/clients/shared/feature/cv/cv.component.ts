import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setupActions } from 'src/app/store/actions';
import { selectUserProfileSetup } from 'src/app/store/setup/setup.reducers';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent {
  store = inject(Store);
  userProfile$ = this.store.selectSignal(selectUserProfileSetup);
  cv: FormControl;
  constructor() {
    this.cv = new FormControl(null, [
      Validators.required,
      this.fileTypeValidator(['pdf', 'doc', 'docx']),
      this.fileSizeValidator(5 * 1024 * 1024),
      this.fileCountValidator(1)
    ]);
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
    CV.append('file', this.cv.value[0]);
    this.store.dispatch(setupActions.addCV({ request: CV }));
  }

}
