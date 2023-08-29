import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
    cv: new FormControl('', [
      Validators.required,
      MaxSizeValidator(5 * 1024 * 1024),
      AcceptValidator(' .pdf, .doc, .docx'),
    ]),
  });
}
