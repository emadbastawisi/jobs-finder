import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { Country, State, City } from 'country-state-city';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-country-state-city',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    SelectComponent,
  ],
  templateUrl: './country-state-city.component.html',
  styleUrls: ['./country-state-city.component.css'],
})
export class CountryStateCityComponent {
  @Input() FormGroup!: FormGroup;
  @Input() Control!: FormControl;

  countryListFull = computed(() => {
    return Country.getAllCountries().map((country) => {
      return { name: country.name, isoCode: country.isoCode };
    });
  });
  countryList = computed(() => {
    return this.countryListFull().map((country) => country.name);
  });
  selectedCountry = signal<string>('');

  stateListFull = computed(() => {
    return State.getStatesOfCountry(this.selectedCountry())!.map((state) => {
      return { name: state.name, isoCode: state.isoCode };
    });
  });
  cityList = computed(() => {
    return this.stateListFull().map((state) => state.name);
  });
  selectedState = signal<string>('');
  areaList = computed(() => {
    return City.getCitiesOfState(
      this.selectedCountry(),
      this.selectedState()
    )!.map((state) => state.name);
  });

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }

  onCountrySelected(value: any) {
    const country = this.countryListFull().find(
      (country) => country.name === value
    );
    this.selectedCountry.set(country!.isoCode);
    try {
      this.FormGroup.removeControl('state');
      this.FormGroup.removeControl('city');
    } catch (e) {}
    if (this.cityList().length !== 0) {
      this.FormGroup.addControl(
        'state',
        new FormControl('', Validators.required)
      );
    }
  }
  onStateSelected(value: any) {
    const state = this.stateListFull().find((state) => state.name === value);
    this.selectedState.set(state!.isoCode);
    try {
      this.FormGroup.removeControl('city');
    } catch (e) {}
    if (this.areaList().length !== 0) {
      this.FormGroup.addControl(
        'city',
        new FormControl('', Validators.required)
      );
    }
  }
}
