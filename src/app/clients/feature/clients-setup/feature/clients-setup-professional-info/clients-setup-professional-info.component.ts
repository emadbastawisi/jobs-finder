import { Component, ViewChild, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as list from '../../utils/list';
import { Store } from '@ngrx/store';
import { selectSkillsFilter, selectUserProfileSetup } from 'src/app/store//setup/setup.reducers';
import { setupActions } from 'src/app/store/setup/setup.actions';
import { ClientsService } from 'src/app/clients/data-access/clients.service';
import { map } from 'rxjs';
import { EducationComponent } from 'src/app/clients/shared/feature/education/education.component';
import { UserSkills } from 'src/app/clients/utils/models/userProfile.models';

@Component({
  selector: 'app-clients-setup-professional-info',
  templateUrl: './clients-setup-professional-info.component.html',
  styleUrls: ['./clients-setup-professional-info.component.css'],
})
export class ClientsSetupProfessionalInfoComponent {
  yearsOfExperienceList = list.yearsOfExperienceList;

  store = inject(Store);
  fb = inject(FormBuilder);
  clientsService = inject(ClientsService);

  userProfile$ = this.store.selectSignal(selectUserProfileSetup);
  skills$ = this.store.selectSignal(selectSkillsFilter);
  skillsList$ = computed(() => {
    if (this.skills$()!.length > 0) {
      return this.skills$()!.map((skill) => {
        return skill.name
      })
    } else {
      return []
    }
  })

  professionalInfoForm: FormGroup;
  @ViewChild(EducationComponent) education!: EducationComponent;
  constructor() {
    this.professionalInfoForm = this.fb.group({
      years_of_experience: [null, Validators.required],
      skills: [[], Validators.required]
    });
  }

  getControl(controlName: string): FormControl {
    return this.professionalInfoForm.get(controlName) as FormControl;
  }

  onSkillsInputChange(event: any) {
    this.store.dispatch(setupActions.getSkills({ request: event }));
  }

  prevStep() {
    this.clientsService.moveToPrevStep();
  }
  personalInfoFormSubmit() {
    this.education.submitEducation();
    this.clientsService.addYearsOfExperience(this.professionalInfoForm.value.years_of_experience);
    const skills = this.professionalInfoForm.value.skills.map((skill: string) => {
      return {
        skill: skill,
        proficiency: "Beginner"
      }
    })
    this.store.dispatch(setupActions.addSkills({ request: skills }));
  }
  onClick() {
    this.clientsService.addYearsOfExperience(this.professionalInfoForm.value.years_of_experience);
  }
}


