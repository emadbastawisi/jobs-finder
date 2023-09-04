import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as list from '../../shared/utils/list';
import { Store } from '@ngrx/store';
import { selectUserProfileSetup } from '../../data-access/store/reducers';
import { UserCareerInterestsIn } from '../../utils/models/userProfile.models';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'app-clients-setup-career-interests',
  templateUrl: './clients-setup-career-interests.component.html',
  styleUrls: ['./clients-setup-career-interests.component.css'],
})
export class ClientsSetupCareerInterestsComponent implements OnInit {
  careerLevelList = list.careerLevelList;
  jobTypeList = list.jobTypeList;
  categoriesList = list.categoriesList;
  store = inject(Store);
  userProfile$ = this.store.select(selectUserProfileSetup);

  @Input() FormGroup: FormGroup = new FormGroup({});

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
ngOnInit(): void {
  this.userProfile$.pipe(
    filter(userProfile => userProfile !== undefined && userProfile!.career_interests !== null),
    map(userProfile => {
      const { career_interests } = userProfile!;
      return {
        ...career_interests,
        job_types: career_interests!.job_types.split(','),
        job_categories: career_interests!.job_categories.split(','),
      };
    }),
    take(1)
  ).subscribe(formData => {
    console.log(formData);
    this.FormGroup.patchValue(formData);
  });
}
}
