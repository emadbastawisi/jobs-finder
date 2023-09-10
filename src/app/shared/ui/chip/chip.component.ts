import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

interface chipState {
  value: number;
  state: string;
}
@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule ],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {

  @Input() list: chipState[] = [];
  trackByFn(index : number, item : chipState) {
  return item.value; // or a unique id corresponding to the item
}

}
