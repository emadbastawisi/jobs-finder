import { Component, computed, signal } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

interface SearchState {
  number: number;
  list: { value: number; state: string }[];
  stages: number;
  currentStage: number;
  found: boolean;
}


@Component({
  selector: 'app-binary-search',
  templateUrl: './binary-search.component.html',
  styleUrls: ['./binary-search.component.css']
})

export class BinarySearchComponent {
  number: FormControl = new FormControl();
  startNumber: FormControl = new FormControl();
  endNumber: FormControl = new FormControl();
  searchState = signal<SearchState>({
    number: 0,
    list: [],
    stages: 0,
    currentStage: 0,
    found: false
  });
  step_number = 0;
  state = computed(() => this.searchState());
  list = computed(() => this.searchState().list.map(item => {
    return { value: item.value.toString(), state: item.state };
  }));
  stages = computed(() => this.searchState().stages);
  currentStage = computed(() => this.searchState().currentStage);


  createRange(start: number, end: number) {
    return new Array(end - start + 1).fill(0)
      .map((n, index) => start + index);
  }

  findNumber(): void {
    this.step_number = 0
    this.searchState.mutate((state) => {
      state.number = this.number.value;
      const range = this.createRange(parseInt(this.startNumber.value), parseInt(this.endNumber.value));
      const middleIndex = Math.floor((range.length - 1) / 2);
      state.list = range.map((value, index) => {
        let chipState: string;
        if (index < middleIndex) {
          chipState = 'left';
        } else if (index > middleIndex) {
          chipState = 'right';
        } else {
          chipState = 'middle';
        }
        return { value: value, state: chipState };
      });
      state.stages = Math.ceil(Math.log2(state.list.length));
      state.currentStage = 0;
      state.found = false;
    })
    console.log(this.searchState());

  }
  searchSteps(steps: number) {
    let state = this.searchState();
    let list = [...state.list]; // copy the list
    let left = 0;
    let right = list.length - 1;
    let mid = Math.floor((left + right) / 2);
    state.currentStage = 0;
    for (let i = 0; i < steps; i++) {
      if (left > right) {
        // The search is over, update the state and return
        this.searchState.set({ ...state, found: false });
        console.log('not found');
        return;
      }

      if (list[mid].value == state.number) {
        // The number is found, update the state and return
        state.found = true
        this.searchState.set({
          ...state,
          list: list.map((item, index) => index !== mid ? { ...item, state: 'disabled' } : { ...item, state: 'middle' }),
          found: true
        });
        console.log('found');
        return;
      } else if (list[mid].value < state.number) {
        left = mid + 1;
        state.list = state.list.map((item, index) => index < left ? { ...item, state: 'disabled' } : item);

      } else {
        right = mid - 1;
        state.list = state.list.map((item, index) => (index > right && index < list.length) ? { ...item, state: 'disabled' } : item);
      }
      console.log(left, right)
      mid = Math.floor((left + right) / 2);
      console.log(mid)
      // Update the left and right list in the 
      state.list = state.list.map((item, index) => (index >= left && index < mid) ? { ...item, state: 'left' } : item);
      state.list = state.list.map((item, index) => (index >= mid + 1 && index < right + 1) ? { ...item, state: 'right' } : item);
      state.list = state.list.map((item, index) => (index == mid) ? { ...item, state: 'middle' } : item);
      console.log(state);
      // Update the current stage and middle index in the state
      state.currentStage++;
    }

    // Update the state after all steps if necessar
    if (state.found === false) {
      this.searchState.set(state);
    }
  }



  nextStage(): void {
    this.step_number++;
    if (this.searchState().found) {
      this.step_number--;
    }
    this.searchSteps(this.step_number);
    console.log(this.step_number);
  }


  prevStage(): void {
    this.step_number--;
    if (this.step_number <= 0) {
      this.findNumber();
      this.step_number = 0;
    } else {
      this.searchSteps(this.step_number);
    }

  }

}


