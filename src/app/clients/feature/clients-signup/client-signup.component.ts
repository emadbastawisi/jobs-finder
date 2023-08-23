import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from '../../data-access/clients.service';
import { UsersRegister } from '../../utils/models/users-register.model';
import { Observable, debounceTime, switchMap } from 'rxjs';
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
  username$ = new Observable<boolean>
  email$ = new Observable<boolean>

  signupForm = new FormGroup({
    username: new FormControl('', (Validators.required)),
    email: new FormControl('', (Validators.required, Validators.email)),
    password: new FormControl('', (Validators.required, Validators.minLength(6)))
  })

  isSubmitting$ = this.store.select(selectIsSubmitting)

  constructor() { }
  ngOnInit(): void {
    this.username$ = this.clientsService.checkUsername()
    this.email$ = this.clientsService.checkEmail()
    this.signupForm.controls.username.valueChanges.pipe(
      debounceTime(1000),
      switchMap(async (changedValue) => this.clientsService.checkUsernameApi(changedValue)),).subscribe()
    this.signupForm.controls.email.valueChanges.pipe(
      debounceTime(1000),
      switchMap(async (changedValue) => this.clientsService.checkEmailApi(changedValue)),).subscribe()
  }

  signup() {
    const request: UsersRegister = this.signupForm.getRawValue()
    this.store.dispatch(authActions.signup({ request }))
  }

}
