import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ClientsService } from '../../data-access/clients.service';
import { map } from 'rxjs/operators';
import { UsersRegister } from '../../utils/models/users-register.model';


@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent {

  hide = true
  api = environment.api.address
  clientsService = inject(ClientsService)
  Router = inject(Router)

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.email)),
    password: new FormControl('', (Validators.required, Validators.minLength(6)))

  })
  signup() {
    const user: UsersRegister = {
      username: this.signupForm.value.username!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!

    }
    console.log(user);
    this.clientsService.register(user).subscribe(
      (data) => { console.log(data); this.Router.navigate(['/clients/login']) },
      (err) => {
        if (err.error.detail == "User already registered ")
          alert("User already registered")
      }
    );
  }
}


