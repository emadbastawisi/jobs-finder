import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipGrid, MatChipInputEvent, MatChipListbox, MatChipsModule } from "@angular/material/chips";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable, startWith, map } from 'rxjs';
import { User } from './user';
import { Fruit } from './fruit';


const user = {
  firstName: "Lindsey",
  lastName: "Broos",
  fruits: []
};

@Component({
  selector: 'app-chips-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.css']
})
export class ChipsAutocompleteComponent {
  public selectable = true;
  public removable = true;
  public addOnBlur = true;

  public userForm!: FormGroup;
  public user!: User;
  public fruits = [
    { id: 1, name: "lemon" },
    { id: 2, name: "lime" },
    { id: 3, name: "orange" },
    { id: 4, name: "strawberry" },
    { id: 5, name: "raspberry" }
  ];
  public filteredFruits$!: Observable<Fruit[]>;

  @ViewChild('fruitList') fruitList!: MatChipGrid;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = user;
    this.buildUserForm();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  public selectFruit(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) {
      return;
    }

    const value = event.option.value;

    if (value && value instanceof Object && !this.user.fruits.includes(value)) {
      this.user.fruits.push(value);
      this.userForm.get("fruits")!.setValue(this.user.fruits);
      this.userForm.get("fruitInput")!.setValue("");
    }
  }

  public addFruit(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value.trim()) {
      const matches = this.fruits.filter(
        fruit => fruit.name.toLowerCase() === value
      );
      const formValue = this.userForm.get("fruits")!.value;
      const matchesNotYetSelected =
        formValue === null
          ? matches
          : matches.filter(x => !formValue.find((y: Fruit) => y.id === x.id));
      if (matchesNotYetSelected.length === 1) {
        this.user.fruits.push(matchesNotYetSelected[0]);
        this.userForm.get("fruits")!.setValue(this.user.fruits);
        this.userForm.get("fruitInput")!.setValue("");
      }
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  public remove(fruit: Fruit) {
    const index = this.user.fruits.indexOf(fruit);
    if (index >= 0) {
      this.user.fruits.splice(index, 1);
      this.userForm.get("fruits")!.setValue(this.user.fruits);
      this.userForm.get("fruitInput")!.setValue("");
    }
  }

  private buildUserForm(): void {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      fruitInput: [null],
      fruits: [this.user.fruits, this.validateFruits]
    });

    this.userForm
      .get("fruits")!
      .statusChanges.subscribe(
        status => (this.fruitList.errorState = status === "INVALID")
      );

    this.filteredFruits$ = this.userForm.get("fruitInput")!.valueChanges.pipe(
      startWith(""),
      map(value => this.fruitFilter(value))
    );
  }

  private fruitFilter(value: any): Fruit[] {
    const filterValue =
      value === null || value instanceof Object ? "" : value.toLowerCase();
    const matches = this.fruits.filter(fruit =>
      fruit.name.toLowerCase().includes(filterValue)
    );
    const formValue = this.userForm.get("fruits")!.value;
    return formValue === null
      ? matches
      : matches.filter(x => !formValue.find((y: Fruit) => y.id === x.id));
  }

  private validateFruits(fruits: FormControl) {
    if (fruits.value && fruits.value.length === 0) {
      return {
        validateFruitsArray: { valid: false }
      };
    }

    return null;
  }
}
