import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients-setup-general-info',
  templateUrl: './clients-setup-general-info.component.html',
  styleUrls: ['./clients-setup-general-info.component.css'],
})
export class ClientsSetupGeneralInfoComponent {
  @Input() FormGroup!: FormGroup;
  genderChips = ['Male', 'Female'];
  countryList = ['Egypt', 'USA', 'Canada'];
  cityList = ['Egypt', 'USA', 'Canada'];
  areaList = ['Egypt', 'USA', 'Canada'];

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
}
