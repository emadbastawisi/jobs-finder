import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatChipsModule, MatFormFieldModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent {
  @Input() chipsList: string[] = [""];
  @Input() Control: FormControl = new FormControl();
  @Input() multiple: boolean = false;

}
