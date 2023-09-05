import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as list from '../../utils/list';
import { Store } from '@ngrx/store';
import { selectUserProfileSetup } from '../../../../../store/setup/setup.reducers';
import { filter, map, take } from 'rxjs';
import { setupActions } from 'src/app/store/setup/setup.actions';

@Component({
  selector: 'app-clients-setup-career-interests',
  templateUrl: './clients-setup-career-interests.component.html',
  styleUrls: ['./clients-setup-career-interests.component.css'],
})
export class ClientsSetupCareerInterestsComponent implements OnInit {

  fb = new FormBuilder();
  careerInterestsForm: FormGroup;
  constructor() {
    this.careerInterestsForm = this.fb.group({
      career_level: ['', Validators.required],
      job_types: ['', Validators.required],
      job_categories: [[], Validators.required],
      min_salary: [null, Validators.required],
      hide_min_salary: [false]
    });
  }

  careerLevelList = list.careerLevelList;
  jobTypeList = list.jobTypeList;
  categoriesList = list.categoriesList;
  store = inject(Store);
  userProfile$ = this.store.select(selectUserProfileSetup);

  getControl(controlName: string): FormControl {
    return this.careerInterestsForm.get(controlName) as FormControl;
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
      this.careerInterestsForm.patchValue(formData);
    });
  }

  careerInterestsFormSubmit() {
    if (this.careerInterestsForm.valid) {
      const Data = this.careerInterestsForm.getRawValue();
      Data.job_types = Data.job_types.join(',');
      Data.job_categories = Data.job_categories.join(',');
      this.store.dispatch(setupActions.careerInterest({ request: Data }));
    } else {
      this.careerInterestsForm.markAllAsTouched();
    }
  }
}
