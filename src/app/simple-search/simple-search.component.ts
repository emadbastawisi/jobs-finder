import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface stepState {
  found: boolean;
  list: { value: number, state: string }[];
}

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent {
  _snackBar = inject(MatSnackBar)
  FormGroup = new FormGroup({
    number: new FormControl('', (Validators.required)),
    startNumber: new FormControl('', (Validators.required)),
    endNumber: new FormControl('', (Validators.required)),
  })
  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
  searchState = signal<stepState>({
    found: false,
    list: [],
  });
  list = computed(() => this.searchState().list);
  searchStatus = computed(() => this.searchState().found);
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });

  }


  createRange(start: number, end: number) {
    if (start > end) {
      return new Array(start - end + 1).fill(0)
        .map((n, index) => start - index);
    } else {
      return new Array(end - start + 1).fill(0)
        .map((n, index) => start + index);
    }
  }

  async findNumber(): Promise<void> {
    this.searchState.set({
      found: false,
      list: [],
    })
    const arr = this.createRange(parseInt(this.getControl('startNumber').value), parseInt(this.getControl('endNumber').value));
    const target = parseInt(this.getControl('number').value);
    this.searchState.set({
      found: false,
      list: arr.map((n, index) => ({
        value: n,
        state: index === 0 ? 'left' : 'middle',
      }))
    })
    await this.linearSearch(arr, target, 200);
    this.openSnackBar(this.searchState().found ? 'Found' : 'Not Found');
  }

  async linearSearch(arr: number[], target: number, debounceTime: number): Promise<void> {
    for (let i = 0; i < arr.length; i++) {
      await new Promise(resolve => setTimeout(resolve, debounceTime));
      if (arr[i] === target) {
        this.searchState.mutate((state) => {
          state.found = true;
        });

        break;
      } else {
        this.searchState.mutate((state) => {
          state.found = false;
          state.list[i].state = 'disabled';
          if (i + 1 < arr.length) state.list[i + 1].state = 'left';
        });
      }
    }
  }

}
