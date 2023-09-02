import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatChipGrid,
  MatChipInputEvent,
  MatChipListbox,
  MatChipsModule,
} from '@angular/material/chips';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ENTER, COMMA, I } from '@angular/cdk/keycodes';
import { Observable, startWith, map } from 'rxjs';
// import { User } from './user';
// import { Fruit } from './fruit';

const user = {
  fruits: [],
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
    MatOptionModule,
  ],
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.css'],
})
export class ChipsAutocompleteComponent {
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() label = '';
  @Input() chips = [''];
  @Input() Control: FormControl = new FormControl();
  @Input() placeholder: string = '';

  chipInput: FormControl = new FormControl(null);
  selectedChips: string[] = [];

  public filteredChips$!: Observable<string[]>;

  ngOnInit(): void {
    this.filteredChips$ = this.chipInput!.valueChanges.pipe(
      startWith(''),
      map((value) => this.chipFilter(value))
    );
  }

  public selectChip(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) {
      return;
    }

    const value = event.option.value;

    if (value && !this.selectedChips.includes(value)) {
      this.selectedChips.push(value);
      this.Control!.setValue(this.selectedChips);
      this.chipInput!.setValue('');
    }
  }

  public addChip(event: any): void {
    const input = event.input;
    const value = event.value;

    if (value.trim()) {
      const matches = this.chips.filter((chip) => chip.toLowerCase() === value);
      const formValue = this.Control!.value;
      const matchesNotYetSelected =
        formValue === null
          ? matches
          : matches.filter((x) => !formValue.find((y: string) => y === x));
      if (matchesNotYetSelected.length === 1) {
        this.selectedChips.push(matchesNotYetSelected[0]);
        this.Control!.setValue(this.selectedChips);
        this.chipInput!.setValue('');
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public remove(chip: string) {
    const index = this.selectedChips.indexOf(chip);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
      this.Control!.setValue(this.selectedChips);
      this.chipInput!.setValue('');
    }
  }

  private chipFilter(value: any): string[] {
    const filterValue =
      value === null || value instanceof Object ? '' : value.toLowerCase();
    const matches = this.chips.filter((chip) =>
      chip.toLowerCase().startsWith(filterValue)
    );
    const formValue = this.Control!.value;
    return formValue === null
      ? matches
      : matches.filter((x) => !formValue.find((y: string) => y === x));
  }
}
