import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from '../../data-access/clients.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {

  hide = true
  clientsService = inject(ClientsService)
  Router = inject(Router)
  loginForm: any = new FormGroup({
    username: new FormControl('', (Validators.required, Validators.email)),
    password: new FormControl('', (Validators.required))
  })

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.loginForm.get('username').value);
    formData.append('password', this.loginForm.get('password').value);
    console.log(formData);
    this.clientsService.login(formData).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('username', response.username);
        this.Router.navigate(['/home'])
      },
      (err) => console.log(err)
    );
  }
}
