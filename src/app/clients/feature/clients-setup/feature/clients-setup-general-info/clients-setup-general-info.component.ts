import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUserProfileSetup } from '../../../../../store//setup/setup.reducers';
import { filter, map, take } from 'rxjs';
import { setupActions } from 'src/app/store/setup/setup.actions';
import { ClientsService } from 'src/app/clients/data-access/clients.service';

@Component({
  selector: 'app-clients-setup-general-info',
  templateUrl: './clients-setup-general-info.component.html',
  styleUrls: ['./clients-setup-general-info.component.css'],
})
export class ClientsSetupGeneralInfoComponent implements OnInit {
  store = inject(Store);
  fb = inject(FormBuilder);
  clientsService = inject(ClientsService);
  userProfile$ = this.store.select(selectUserProfileSetup);
  generalInfoForm: FormGroup;

  constructor() {
    this.generalInfoForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthdate: [null, Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      phone: ['', Validators.required],
      address: this.fb.group({
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required]
      })
    });
  }
  genderChips = [' Male ', 'Female'];

  getControl(controlName: string): FormControl {
    return this.generalInfoForm.get(controlName) as FormControl;
  }

  getFormGroup(controlName: string): FormGroup {
    return this.generalInfoForm.get(controlName) as FormGroup;
  }

  prevStep() {
    this.clientsService.moveToPrevStep();
  }

  generalInfoFormSubmit() {
    if (this.generalInfoForm.valid) {
      const Data = this.generalInfoForm.getRawValue();
      Data.birthdate = Data.birthdate.toISOString();
      Data.address = this.addressToStr(Data.address);
      console.log(Data);
      this.store.dispatch(setupActions.generalInfo({ request: Data }));
    }
  }

  addressToStr(address: { [key: string]: string }): string {
    const keys = ['country', 'state', 'city'];
    const values = keys.map(key => address[key] || '');
    return values.join(',');
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
      this.generalInfoForm.patchValue(formData);
    });
  }
}
