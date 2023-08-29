import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() Control: FormControl = new FormControl();
  @Input() greenHint: string = '';
  @Input() icon: string = '';
  @Output() change = new EventEmitter<typeof this.type>();

  hide = true;

  errorMessages: Record<string, string> = {
    required: 'This field is required',
    email: 'Please enter a valid email',
    emailTaken: 'Email is already registered',
    minlength: 'Minimum length is 8',
    maxlength: 'Maximum length is 30',
    usernameTaken: 'Username is already taken',
    passwordNotMatch: 'Passwords do not match',
    passwordNotStrong: 'Password is not strong enough',
  };
  greenHintMessages: Record<string, string> = {
    emailAvailable: 'This email is available',
    usernameAvialable: 'This email is available',
  };

  onChange(event: any) {
    this.change.emit(event.value);
  }

  validateNumberInput(input: any) {
    // Use a regular expression to match only numeric characters
    const regex = /[^0-9]/g;
    // Replace any non-numeric characters with an empty string
    input.target.value = input.target.value.replace(regex, '');
  }
  constructor() {}
}
