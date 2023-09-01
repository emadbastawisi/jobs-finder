import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.css'],
})
export class InputAutocompleteComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = '';
  @Input() Control: FormControl = new FormControl();
  @Input() list: string[] = [];

  filteredOptions = signal<string[]>([]);
  ngOnInit() {
    this.Control.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          const filteredOptions = this._filter(value || '');
          return of(filteredOptions);
        })
      )
      .subscribe((filteredOptions) => {
        this.filteredOptions.set(filteredOptions);
      });
  }

  private _filter(value: string): string[] {
    return this.list.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }
}
