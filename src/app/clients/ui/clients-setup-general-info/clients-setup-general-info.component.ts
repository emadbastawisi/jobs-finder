import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients-setup-general-info',
  templateUrl: './clients-setup-general-info.component.html',
  styleUrls: ['./clients-setup-general-info.component.css'],
})
export class ClientsSetupGeneralInfoComponent implements OnInit {
  @Input() FormGroup!: FormGroup;

  genderChips = [' Male ', 'Female'];

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }

  getFormGroup(controlName: string): FormGroup {
    return this.FormGroup.get(controlName) as FormGroup;
  }

  ngOnInit(): void {}
}
