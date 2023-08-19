import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ClientsService } from '../../data-access/clients.service';
import { UsersRegister } from '../../utils/models/users-register.model';
import { Observable, debounceTime, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { signup } from '../../data-access/store/actions';



@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent implements OnInit {


  clientsService = inject(ClientsService)
  Router = inject(Router)
  store = inject(Store)
  hide = true
  api = environment.api.address
  username$ = new Observable<boolean>
  email$ = new Observable<boolean>

  signupForm = new FormGroup({
    username: new FormControl('', (Validators.required)),
    email: new FormControl('', (Validators.required, Validators.email)),
    password: new FormControl('', (Validators.required, Validators.minLength(6)))
  })

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
    this.store.dispatch(signup({ request }))
  }

  // signup() {
  //   this.clientsService.register(this.signupForm.getRawValue()).subscribe(
  //     (data) => {
  //       console.log(data)
  //       window.location.reload();
  //     },
  //     (err) => {
  //       if (err.error.detail == "User already registered ")
  //         alert("User already registered")
  //     }
  //   );
  // }
}
