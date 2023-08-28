import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
})
export class ChipsComponent {
  @Input() chips: string[] = [''];
  @Input() Control: FormControl = new FormControl();
  @Input() multiple: boolean = false;
  @Input() max: number = 99;

  selectedList: any = [];
  onChange(event: any) {
    if (event.value) {
      this.selectedList = event.value;
    } else {
      this.selectedList = [];
    }
  }
}
