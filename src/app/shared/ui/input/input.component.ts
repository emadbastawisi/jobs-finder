import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldDefaultOptions, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label: string = "";
  @Input() type: string = "";
  @Input() Control: FormControl = new FormControl();
  @Input() greenHint: string = "";
  @Input() icon: string = "";

  hide = true

  errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'Please enter a valid email',
    emailTaken: 'Email is already registered',
    minlength: 'Minimum length is 8',
    maxlength: 'Maximum length is 30',
    usernameTaken: 'Username is already taken',
    passwordNotMatch: 'Passwords do not match',
    passwordNotStrong: 'Password is not strong enough'
  }
  greenHintMessages: Record<string, string> = {
    emailAvailable: 'This email is available',
    usernameAvialable: 'This email is available',
  }
  constructor() { }
}



// custom validator class

// export class CustomeValidators {
//   static usernameAvailable(CS: ClientsService) {
//     return (control: AbstractControl) => {
//       return control.valueChanges.pipe(
//         debounceTime(1000),
//         switchMap((changedValue) => CS.checkUsernameApi(changedValue)),
//         take(1),
//         map((isAvailable: boolean) => {
//           return isAvailable === true ? null : { usernameTaken: true };
//         })
//       );
//     };
//   }
//   static emailAvailable(CS: ClientsService) {
//     return (control: AbstractControl) => {
//       return control.valueChanges.pipe(
//         debounceTime(1000),
//         switchMap((changedValue) => CS.checkEmailApi(changedValue)),
//         take(1),
//         map((isAvailable: boolean) => {
//           return isAvailable === true ? null : { emailTaken: true };
//         })
//       );
//     };
//   }
// }