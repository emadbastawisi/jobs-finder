import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/store/auth/auth.actions';
import { selectCurrentUser } from 'src/app/store/auth/auth.reducers';
import { ClientLoginComponent } from 'src/app/clients/feature/clients-login/client-login.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolBarComponent {

  store = inject(Store)
  currentUser$ = this.store.selectSignal(selectCurrentUser)
  private dialog = inject(MatDialog);

  openLoginDialog() {
    this.dialog.open(ClientLoginComponent);
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }

  // themes
  darktheme = false
  theme() {
    this.darktheme = !this.darktheme
    localStorage.setItem('darktheme', this.darktheme.toString())
    document.body.classList.toggle('dark-theme');
  }
  ngOnInit() {
    // load theme profile
    if (localStorage.getItem('darktheme') === 'true') {
      this.darktheme = true
      document.body.classList.add('dark-theme');
    }
    // get current user
    this.store.dispatch(authActions.getCurrentUser())
  }
}
