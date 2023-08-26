import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients-setup',
  templateUrl: './clients-setup.component.html',
  styleUrls: ['./clients-setup.component.css']
})
export class ClientsSetupComponent {
  signupForm = new FormGroup({
    first_name: new FormControl('', (Validators.required)),
  })
  signinForm = new FormGroup({
    first_name: new FormControl('', (Validators.required)),
  })

}
