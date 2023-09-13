import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserWorkExperience } from 'src/app/clients/utils/models/userProfile.models';
import { setupActions } from 'src/app/store/actions';
import { selectUserProfileSetup } from 'src/app/store/setup/setup.reducers';
import { WorkExperienceFormComponent } from '../../ui/work-experience/work-experience-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent {
  store = inject(Store)
  dialog = inject(MatDialog)
  userProfile$ = this.store.selectSignal(selectUserProfileSetup);
  addMoreWorkExperience = false

  onAddMoreWorkExperience() {
    this.addMoreWorkExperience = true
  }
  onWorkExperienceCancel() {
    if (this.userProfile$()!.work_experience!.length > 0) {
      this.addMoreWorkExperience = false
    }
  }
  onWorkExperienceSave(event: UserWorkExperience) {
    this.store.dispatch(setupActions.addWorkExperience({ request: event }));
    this.addMoreWorkExperience = false
  }
  onWorkExperienceEdit(workExperience: UserWorkExperience) {

    const dialogRef = this.dialog.open(WorkExperienceFormComponent, {
      data: { workExperience: workExperience },
    })
    const updateSubscription = dialogRef.componentInstance.update.subscribe(value => {
      this.store.dispatch(setupActions.updateWorkExperience({ request: value }));
    });
    dialogRef.afterClosed().subscribe(() => {
      updateSubscription.unsubscribe();
    });
  }
  onWorkExperienceDelete(id: number) {
    this.store.dispatch(setupActions.deleteWorkExperience({ request: id }));
  }
}
