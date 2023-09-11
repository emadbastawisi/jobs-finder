import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

interface chipState {
  value: number;
  state: string;
}
@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {

  @Input() list: chipState[] = [];
  @Input() chip: chipState = { value: 0, state: '' };
  trackByFn(index: number, item: chipState) {
    return item.value; // or a unique id corresponding to the item
  }

}
