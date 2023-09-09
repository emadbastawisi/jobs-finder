import { Component, computed, signal } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

interface SearchState {
  number: number;
  list: number[];
  disabled: number[];
  leftList: number[];
  rightList: number[];
  middle: number;
  stages: number;
  currentStage: number;
  found: boolean;
}
interface chipState {
  label: string;
  state: string;
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
    disabled: [],
    leftList: [],
    rightList: [],
    middle: 0,
    stages: 0,
    currentStage: 0,
    found: false
  });
  step_number = 0;
  state = computed(() => this.searchState());
  list = computed(() => this.searchState().list.map(String));
  disabled = computed(() => this.searchState().disabled.map(String));
  left = computed(() => this.searchState().leftList.map(String));
  right = computed(() => this.searchState().rightList.map(String));
  middle = computed(() => this.searchState().list[this.searchState().middle]?.toString());
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
      state.list = this.createRange(parseInt(this.startNumber.value), parseInt(this.endNumber.value));
      state.middle = Math.floor(state.list.length / 2);
      state.leftList = state.list.slice(0, state.middle);
      state.rightList = state.list.slice(state.middle + 1, state.list.length);
      state.disabled = [];
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
    state.disabled = [];
    state.currentStage = 0;
    for (let i = 0; i < steps; i++) {
      if (left > right) {
        // The search is over, update the state and return
        this.searchState.set({ ...state, found: false });
        console.log('not found');
        return;
      }

      if (list[mid] == state.number) {
        // The number is found, update the state and return
        state.found = true
        this.searchState.set({
          ...state,
          middle: mid,
          disabled: state.leftList.concat(state.rightList, state.disabled),
          leftList: [],
          rightList: [],
          found: true
        });
        console.log('found');
        return;
      } else if (list[mid] < state.number) {
        left = mid + 1;
        state.disabled = state.disabled.concat(list.slice(0, left));

      } else {
        right = mid - 1;
        state.disabled = list.slice(right + 1, list.length).concat(state.disabled);
      }
      mid = Math.floor((left + right) / 2);
      console.log(mid)
      // Update the left and right list in the 

      state.leftList = list.slice(left, mid);
      state.rightList = list.slice(mid + 1, right + 1);

      console.log(state);
      // Update the current stage and middle index in the state
      state.currentStage++;
      state.middle = mid;

    }

    // Update the state after all steps if necessar
    if (state.found === false) {
      this.searchState.set(state);
    }
  }



  nextStage(): void {
    this.step_number++;
    this.searchSteps(this.step_number);
  }


  prevStage(): void {
    this.step_number--;
    this.searchSteps(this.step_number);
  }

}


