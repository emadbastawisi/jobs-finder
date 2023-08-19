import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientLoginComponent } from 'src/app/clients/feature/clients-login/client-login.component';
import { ClientSignupComponent } from 'src/app/clients/feature/clients-signup/client-signup.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {
  username = localStorage.getItem('username');
  private dialog = inject(MatDialog);
  openSignUpDialog() {
    this.dialog.open(ClientSignupComponent);
  }
  openLoginDialog() {
    this.dialog.open(ClientLoginComponent);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
    return;
  }

}
