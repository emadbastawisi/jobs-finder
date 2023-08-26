import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from '../../data-access/clients.service';
import { UsersRegister } from '../../utils/models/users-register.model';
import { debounceTime, map, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { authActions } from '../../data-access/store/actions';
import { selectIsSubmitting } from '../../data-access/store/reducers';



@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent implements OnInit {

  hide = true
  clientsService = inject(ClientsService)
  Router = inject(Router)
  store = inject(Store)
  isSubmitting$ = this.store.selectSignal(selectIsSubmitting)

  // creat signup form with custom validators
  signupForm = new FormGroup({
    first_name: new FormControl('', (Validators.required)),
    last_name: new FormControl('', (Validators.required)),
    email: new FormControl('', [Validators.required, Validators.email], CustomeValidators.emailAvailable(this.clientsService)),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor() { }
  ngOnInit(): void {

  }

  signup() {
    const request: UsersRegister = this.signupForm.getRawValue()
    this.store.dispatch(authActions.signup({ request }))
  }

}

// custom validator class

export class CustomeValidators {
  static usernameAvailable(CS: ClientsService) {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        switchMap((changedValue) => CS.checkUsernameApi(changedValue)),
        take(1),
        map((isAvailable: boolean) => {
          return isAvailable === true ? null : { usernameTaken: true };
        })
      );
    };
  }
  static emailAvailable(CS: ClientsService) {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        switchMap((changedValue) => CS.checkEmailApi(changedValue)),
        take(1),
        map((isAvailable: boolean) => {
          return isAvailable === true ? null : { emailTaken: true };
        })
      );
    };
  }
}
