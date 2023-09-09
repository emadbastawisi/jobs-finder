import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

interface chipState {
  value: string;
  state: string;
}
@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent implements OnChanges {

  @Input() list: chipState[] = [];

  ngOnChanges(): void {
    console.log(this.list);
  }
}
