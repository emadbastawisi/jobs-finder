import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CareerInterests } from '../../utils/models/career-interests.model';

@Component({
  selector: 'app-clients-setup-career-interests',
  templateUrl: './clients-setup-career-interests.component.html',
  styleUrls: ['./clients-setup-career-interests.component.css']
})
export class ClientsSetupCareerInterestsComponent implements OnInit {
  careerInterestsForm = new FormGroup({
    careerLevel: new FormControl('', Validators.required),
    jobType: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    categories: new FormControl([''], Validators.required),
    minSalary: new FormControl(0, Validators.required),
    hideSalary: new FormControl(false)
  })

  careerInterests = signal<CareerInterests>(
    { careerLevel: '', jobType: '', categories: [''], minSalary: 0, hideSalary: false }
  );
  careerLevelChange(event: any) {
    console.log(event.value);
    this.careerInterests.mutate((state) => {
      state.careerLevel = event.value;
    });
  }
  jobTypeChange(event: any) {
    console.log(event.value);
    this.careerInterests.mutate((state) => {
      state.jobType = event.value;
    });
  }

  hideSalaryChange(event: any) {
    console.log(event);
    this.careerInterests.mutate((state) => {
      state.minSalary = event.checked;
    });
  }
  salaryCtrl = new FormControl(0, Validators.required);

  ngOnInit(): void {
    this.salaryCtrl.valueChanges.subscribe((value: number | null) => {
      this.careerInterests.mutate((state) => {
        state.minSalary = value!;
      });
    });
  }


  careerLevelList = ['Student', 'Entry Level', 'Experienced', 'Manager', 'Senior Management', 'Not specified'];
  jobTypeList = ['Full Time', 'Part Time', 'Freelance', 'Internship', 'Temporary', 'Shift Based', 'Work From Home', 'Volunteering', 'Student Activity'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl('', Validators.required);

  filteredCategories: Observable<string[]>;
  categories: string[] = [''];
  categoriesList = ['Analyst/Research', 'Administration', 'Accounting/Finance', ' Banking', ' C - Level Executive / GM / Director', ' Creative / Design / Art', ' Business Development', ' Education / Teaching', ' Engineering - Oil & Gas / Energy', ' Engineering - Mechanical / Electrical', ' Engineering - Construction / Civil / Architecture', ' Engineering - Other', ' Fashion', ' Engineering - Telecom / Technology', ' Human Resources', ' Hospitality / Hotels / Food Services', ' Installation / Maintenance / Repair', ' Logistics / Supply Chain', ' Legal', ' Manufacturing / Production', ' Media / Journalism / Publishing', ' Marketing / PR / Advertising', ' IT / Software Development', ' Medical / Healthcare', ' Other', ' Pharmaceutical', ' Operations / Management', ' Project / Program Management', ' Purchasing / Procurement', ' Sales / Retail', ' R & D / Science', ' Strategy / Consulting', ' Tourism / Travel', ' Training / Instructor', ' Writing / Editorial', ' Sports and Leisure', ' Quality', ' Customer Service / Support'];

  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor() {

    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => (category ? this._filter(category) : this.categoriesList.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our category
    if (value) {
      this.categories.push(value);
      this.careerInterests.mutate((state) => {
        state.categories = this.categories;
      }
      );
    }

    // Clear the input value
    event.chipInput!.clear();

    this.categoryCtrl.setValue(null);
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
      this.careerInterests.mutate((state) => {
        state.categories = this.categories;
      }
      );

      this.announcer.announce(`Removed ${category}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categoriesList.filter(category => category.toLowerCase().includes(filterValue));
  }

}

