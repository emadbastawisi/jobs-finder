import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { languageList, proficiencyLevelList } from 'src/app/clients/feature/clients-setup/utils/list';
import { UserLanguage } from 'src/app/clients/utils/models/userProfile.models';
import { setupActions } from 'src/app/store/setup/setup.actions';
import { selectUserProfileSetup } from 'src/app/store/setup/setup.reducers';
import { LanguageFormComponent } from '../../ui/language-form/language-form.component';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {
  store = inject(Store);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  userProfile$ = this.store.selectSignal(selectUserProfileSetup);
  onAddLanguage(event: UserLanguage) {
    this.store.dispatch(setupActions.addLanguage({ request: event }));
  }

  onDeleteLanguage(id: number) {
    this.store.dispatch(setupActions.deleteLanguage({ request: id }))
  }

  onUpdateLanguage(language: UserLanguage) {
    const dialogRef = this.dialog.open(LanguageFormComponent, {
      data: { language: language },
    })
    const updateSubscription = dialogRef.componentInstance.update.subscribe(value => {
      this.store.dispatch(setupActions.updateLanguage({ request: value }));
    });
    dialogRef.afterClosed().subscribe(() => {
      updateSubscription.unsubscribe();
    });
  }
}
