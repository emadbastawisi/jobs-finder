import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUserProfileSetup } from '../../data-access/store/reducers';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'app-clients-setup-general-info',
  templateUrl: './clients-setup-general-info.component.html',
  styleUrls: ['./clients-setup-general-info.component.css'],
})
export class ClientsSetupGeneralInfoComponent implements OnInit {
  @Input() FormGroup!: FormGroup;
  store = inject(Store);
  userProfile$ = this.store.select(selectUserProfileSetup);

  genderChips = [' Male ', 'Female'];

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }

  getFormGroup(controlName: string): FormGroup {
    return this.FormGroup.get(controlName) as FormGroup;
  }

  strToAddress(addressStr: string): { [key: string]: string } {
    const keys = ['country', 'state', 'city'];
    const values = addressStr.split(',');
    const address: { [key: string]: string } = {};
    keys.forEach((key, index) => {
      if (values[index]) {
        address[key] = values[index];
      }
    });
    return address;
  }
  ngOnInit(): void {
    this.userProfile$.pipe(
      filter(userProfile => userProfile !== undefined && userProfile!.personal_info !== null),
      map(userProfile => {
        const { personal_info, first_name, last_name } = userProfile!;
        return {
          ...personal_info,
          address: this.strToAddress(personal_info!.address),
          birthdate: new Date(personal_info!.birthdate),
          first_name: first_name!,
          last_name: last_name!,
        };
      }),
      take(1)
    ).subscribe(formData => {
      console.log(formData);
      this.FormGroup.patchValue(formData);
    });
  }
}
