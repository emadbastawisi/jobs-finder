import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as list from '../../utils/list';
import { Store } from '@ngrx/store';
import { selectSkills, selectUserProfileSetup } from 'src/app/store//setup/setup.reducers';
import { setupActions } from 'src/app/store/setup/setup.actions';
import { ClientsService } from 'src/app/clients/data-access/clients.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-clients-setup-professional-info',
  templateUrl: './clients-setup-professional-info.component.html',
  styleUrls: ['./clients-setup-professional-info.component.css'],
})
export class ClientsSetupProfessionalInfoComponent {

  yearsOfExperienceList = list.yearsOfExperienceList;
  educationLevelList = list.educationLevelList;



  store = inject(Store);
  fb = inject(FormBuilder);
  userProfile$ = this.store.selectSignal(selectUserProfileSetup);
  skills$ = this.store.selectSignal(selectSkills);
  skillsList$ = computed(() => {
    if (this.skills$()!.length > 0) {
      return this.skills$()!.map((skill) => {
        return skill.name
      })
    } else {
      return []
    }
  })

  clientsService = inject(ClientsService);

  professionalInfoForm: FormGroup;
  constructor() {
    this.professionalInfoForm = this.fb.group({
      years_of_experience: [null, Validators.required],
      language: this.fb.group({
        id: [],
        language_name: ['', Validators.required],
        proficiency: ['', Validators.required]
      }),
      skills: [[], Validators.required]
    });
  }


  getControl(controlName: string): FormControl {
    return this.professionalInfoForm.get(controlName) as FormControl;
  }
  getFormGroup(groupName: string): FormGroup {
    return this.professionalInfoForm.get(groupName) as FormGroup;
  }
  getFormGroupControl(groupName: string, controlName: string): FormControl {
    return this.getFormGroup(groupName).get(controlName) as FormControl;
  }

  onSkillsInputChange(event: any) {
    this.store.dispatch(setupActions.getSkills({ request: event }));
  }

  personalInfoFormSubmit() {

  }
}


