import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent implements OnChanges {
  @Input() left: string[] = [''];
  @Input() middle: string = '';
  @Input() right: string[] = [''];
  @Input() disabled: string[] = [''];
  @Input() list: string[] = [];

  chips: any[] = [];

  ngOnChanges() {
    this.chips = this.list.map(label => {
      let chip = { label, highlighted: false, color: '', disabled: false };

      if (this.left.includes(label)) {
        chip.highlighted = true;
        chip.color = 'primary';
      } else if (this.middle === label) {
        chip.highlighted = false;
      } else if (this.right.includes(label)) {
        chip.highlighted = true;
        chip.color = 'accent';
      } else if (this.disabled.includes(label)) {
        chip.highlighted = true;
        chip.disabled = true;
      }

      return chip;
    });
  }
}
