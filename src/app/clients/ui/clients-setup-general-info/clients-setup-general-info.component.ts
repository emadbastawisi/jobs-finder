import {
  Component,
  Input,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';
import { location } from './utils';

@Component({
  selector: 'app-clients-setup-general-info',
  templateUrl: './clients-setup-general-info.component.html',
  styleUrls: ['./clients-setup-general-info.component.css'],
})
export class ClientsSetupGeneralInfoComponent implements OnInit {
  @Input() FormGroup!: FormGroup;
  genderChips = ['Male', 'Female'];
  countryListFull = signal<location[]>([]);
  countryList = computed(() => {
    return Country.getAllCountries().map((country) => country.name);
  });
  selectedCountry = signal<string>('');
  cityListFull = computed(() => {
    return State.getStatesOfCountry(this.selectedCountry())!.map((city) => {
      return { name: city.name, isoCode: city.isoCode };
    });
  });
  cityList = computed(() => {
    return State.getStatesOfCountry(this.selectedCountry())!.map(
      (city) => city.name
    );
  });
  selectedCity = signal<string>('');
  areaList = computed(() => {
    return City.getCitiesOfState(
      this.selectedCountry(),
      this.selectedCity()
    )!.map((state) => state.name);
  });

  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }

  getAddressControl(controlName: string): FormControl {
    return this.getControl('address').get(controlName) as FormControl;
  }

  ngOnInit(): void {
    this.countryListFull.set(
      Country.getAllCountries().map((country) => {
        return { name: country.name, isoCode: country.isoCode };
      })
    );

    this.getAddressControl('country')!.valueChanges.subscribe((value) => {
      console.log(value);
      const list = this.countryListFull()
        .filter((country) => {
          return country.name === value;
        })
        .map((country) => {
          return country.isoCode;
        });
      this.selectedCountry.set(list[0]);
    });

    this.getAddressControl('city')!.valueChanges.subscribe((value) => {
      const list = this.cityListFull()
        .filter((city) => {
          return city.name === value;
        })
        .map((city) => {
          return city.isoCode;
        });
      this.selectedCity.set(list[0]);
    });

    // this.cityList.update(
    //   (cityList) =>
    //     (cityList = City.getCitiesOfCountry(counrty)!.map(
    //       (city) => city.name
    //     ))
    // );
  }
}
