import { state } from '@angular/animations';
import { Component, computed, inject, signal } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface stepState {
  found: boolean;
  currentStage: number;
  list: { value: number, state: string }[];
}

interface SearchState {
  number: number;
  list: stepState[];
  stages: number;
}



@Component({
  selector: 'app-binary-search',
  templateUrl: './binary-search.component.html',
  styleUrls: ['./binary-search.component.css']
})

export class BinarySearchComponent {
  _snackBar = inject(MatSnackBar)
  FormGroup = new FormGroup({
    number: new FormControl('', (Validators.required)),
    startNumber: new FormControl('', (Validators.required)),
    endNumber: new FormControl('', (Validators.required)),
  })
  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
  searchState = signal<SearchState>({
    number: 0,
    list: [],
    stages: 0,
  });
  step_number = signal<number>(-1);
  state = computed(() => this.searchState());
  list = computed(() => this.searchState().list[this.step_number()]?.list);




  searchStateReset() {
    this.searchState.set({
      number: 0,
      list: [],
      stages: 0,
    })
  }

  createRange(start: number, end: number) {
    return new Array(end - start + 1).fill(0)
      .map((n, index) => start + index);
  }

  findNumber(): void {
    this.step_number.set(0);
    this.searchStateReset();
    const arr = this.createRange(parseInt(this.getControl('startNumber').value), parseInt(this.getControl('endNumber').value));
    const target = parseInt(this.getControl('number').value);
    let left = 0;
    let right = arr.length - 1;
    this.binarySearchRecursive(arr, target, left, right);
  }



  binarySearchRecursive(arr: number[], target: number, left: number, right: number): void {
    let middle = Math.floor((left + right) / 2);
    const step: stepState = {
      found: false,
      currentStage: 0,
      list: arr.map((value, index) => {
        let chipState: string;
        if (index < middle) {
          chipState = 'left';
        }
        else if (index > middle) {
          chipState = 'right';
        }
        else {
          chipState = 'middle';
        }
        if (index < left || index > right) {
          chipState = 'disabled';
        }
        return { value: value, state: chipState };
      })
    };
    step.currentStage = this.searchState().list.length;
    if (left > right) {
      step.found = false;
      step.list = step.list.map((item) => { return { ...item, state: 'disabled' } });
      this.searchState.mutate(state => {
        state.list.push(step);
        return state;
      });
      return;
    }
    if (arr[middle] === target) {
      step.found = true;
      step.list = step.list.map((item, index) => index !== middle ? { ...item, state: 'disabled' } : { ...item, state: 'middle' });
      this.searchState.mutate(state => {
        state.list.push(step);
        return state;
      });
      return;
    }
    this.searchState.mutate(state => {
      state.list.push(step);
      return state;
    });

    if (arr[middle] < target) {
      return this.binarySearchRecursive(arr, target, middle + 1, right);
    } else {
      return this.binarySearchRecursive(arr, target, left, middle - 1);
    }
  }

  nextStage(): void {
    this.step_number.set(this.step_number() + 1);
    if (this.searchState().list[this.step_number()].found) {
      this._snackBar.open('Found', 'Close', {
        duration: 2000,
      })
    }
    if (this.step_number() >= this.searchState().list.length - 1 && !this.searchState().list[this.step_number()].found) {
      this._snackBar.open('Not Found', 'Close', {
        duration: 2000,
      })
    }


  }


  prevStage(): void {
    this.step_number.set(this.step_number() - 1);
    if (this.step_number() <= 0) {
      this.step_number.set(0);
    }
  }
}