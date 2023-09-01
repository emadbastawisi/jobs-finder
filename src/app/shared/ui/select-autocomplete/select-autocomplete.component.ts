import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-select-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.css'],
})
export class SelectAutocompleteComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() Control: FormControl = new FormControl();
  @Input() list: string[] = [];
  filteredList: string[];

  constructor() {
    this.filteredList = this.list.slice();
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredList = this.list.filter((o) =>
      o.toLowerCase().includes(filterValue)
    );
  }
}
