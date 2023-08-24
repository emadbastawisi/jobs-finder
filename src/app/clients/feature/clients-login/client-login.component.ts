import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ClientsService } from '../../data-access/clients.service';
import { Router } from '@angular/router';
import { selectCurrentUser, selectIsSubmitting, selectValidationErrors } from '../../data-access/store/reducers';
import { Store } from '@ngrx/store';
import { authActions } from '../../data-access/store/actions';




@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {

  hide = true
  clientsService = inject(ClientsService)
  router = inject(Router)
  store = inject(Store)
  isSubmitting$ = this.store.selectSignal(selectIsSubmitting)
  error$ = this.store.selectSignal(selectValidationErrors)


  loginForm: any = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.loginForm.get('username').value);
    formData.append('password', this.loginForm.get('password').value);
    const request = formData
    this.store.dispatch(authActions.login({ request }))
  }

  ngOnInit(): void {
    // clear errors state on load
    this.store.dispatch(authActions.loginReset())
  }

}
