import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatChipsModule,
} from '@angular/material/chips';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
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
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable, startWith, map } from 'rxjs';



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
  @Input() filter: string = 'local';
  @Input() max: number = 99;
  @Output() inputChange = new EventEmitter();

  chipInput: FormControl = new FormControl(null);

  public filteredChips$!: Observable<string[]>;

  onInputChange(event: any) {
    if (event !== '') {
      this.inputChange.emit(event);
    }

  }
  ngOnInit(): void {
    if (this.filter === 'local') {
      this.filteredChips$ = this.chipInput!.valueChanges.pipe(
        startWith(''),
        map((value) => this.chipFilter(value))
      );
    }
  }

  public selectChip(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) {
      return;
    }
    if (this.Control.value.length >= this.max) {
      return;
    }
    const value = event.option.value;

    if (value && !this.Control.value.includes(value)) {
      this.Control!.setValue(this.Control.value.concat(value));
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
        this.Control!.setValue(
          this.Control.value.concat(matchesNotYetSelected[0])
        );
        this.chipInput!.setValue('');
      }
    }
    if (input) {
      input.value = '';
    }
  }

  public remove(chip: string) {
    const index = this.Control!.value.indexOf(chip);
    if (index >= 0) {
      this.Control!.setValue(
        this.Control.value.filter((x: string) => x !== chip)
      );
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
