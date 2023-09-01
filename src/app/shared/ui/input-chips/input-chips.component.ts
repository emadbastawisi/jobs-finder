import { CommonModule } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, inject } from '@angular/core';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-chips',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.css'],
})
export class InputChipsComponent {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() Control: FormControl = new FormControl();
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chips: string[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our chip
    if (value) {
      this.chips.push(value);
      this.Control!.setValue(this.chips);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(chip: string): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
      this.Control!.setValue(this.chips);

      this.announcer.announce(`Removed ${chip}`);
    }
  }

  edit(chip: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove chip if it no longer has a name
    if (!value) {
      this.remove(chip);
      return;
    }

    // Edit existing chip
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips[index] = value;
      this.Control!.setValue(this.chips);
    }
  }
}
