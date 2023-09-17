import { Component, computed, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



interface SlectionSortState {
  number: number;
  list: { value: number, state: string }[];
  newList: { value: number, state: string }[];
  min: { value: number, state: string };
  temp: { value: number, state: string };
  sorted: boolean
}


@Component({
  selector: 'app-selection-sort',
  templateUrl: './selection-sort.component.html',
  styleUrls: ['./selection-sort.component.css']
})
export class SelectionSortComponent {
  _snackBar = inject(MatSnackBar)
  FormGroup = new FormGroup({
    startNumber: new FormControl('', (Validators.required)),
    endNumber: new FormControl('', (Validators.required)),
    speed: new FormControl('', (Validators.required)),
  })
  speedList = [10, 50, 100, 200, 300, 400, 500, 1000]
  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }

  state = signal<SlectionSortState>({
    number: 0,
    list: [],
    newList: [],
    min: { value: 0, state: '' },
    temp: { value: 0, state: '' },
    sorted: false
  });

  choise: string = ''

  list = computed(() => this.state().list);
  newList = computed(() => this.state().newList);
  min = computed(() => this.state().min);
  temp = computed(() => this.state().temp);
  speed = signal<number>(this.speedList[0])

  constructor() { }

  stateReset() {
    this.state.set({
      number: 0,
      list: [],
      newList: [],
      min: { value: 0, state: '' },
      temp: { value: 0, state: '' },
      sorted: false
    })
  }

  setSpeed(speed: number) {
    this.speed.set(speed)
  }

  randomArray(start: number, end: number): number[] {
    // Handle case where start is larger than end
    if (start > end) {
      [start, end] = [end, start]; // Swap start and end
    }

    // Create a sorted array
    let array = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    // Shuffle the array
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }


  async selectionSortAppend(array: number[]): Promise<void> {
    let n = array.length;
    let newArray: number[] = [];
    this.state.mutate((state) => {
      state.list = array.map((value) => {
        return { value: value, state: 'middle' };
      });
    })
    for (let i = 0; i < n; i++) {
      await new Promise(resolve => setTimeout(resolve, this.speed()));
      // Finding the smallest number in the subarray
      let min = 0;
      this.state.mutate((state) => {
        state.list = array.map((value) => {
          return { value: value, state: 'middle' };
        });
        state.list[0].state = 'left';
        state.min = { value: array[0], state: 'left' };
      })
      for (let j = 0; j < array.length; j++) {
        await new Promise(resolve => setTimeout(resolve, this.speed()));
        this.state.mutate((state) => {
          state.list[j].state = 'left';
        })
        await new Promise(resolve => setTimeout(resolve, this.speed()));
        if (array[j] < array[min]) {
          this.state.mutate((state) => {
            state.list[min].state = 'disabled';
          })
          min = j;
          this.state.mutate((state) => {
            state.min = { value: array[min], state: 'left' };
          })
        } else {
          this.state.mutate((state) => {
            state.list[j].state = 'disabled';
          })
        }
      }
      await new Promise(resolve => setTimeout(resolve, this.speed()));
      newArray.push(array.splice(min, 1)[0]);
      this.state.mutate((state) => {
        let value = newArray[newArray.length - 1]; // Get the last element
        state.newList.push({ value: value, state: 'right' }); // Add it to newList
      })
    }
    this.state.mutate((state) => {
      state.list = [];
      state.sorted = true;
    })
    this._snackBar.open('Sorted', 'Close', {
      duration: 2000,
    })
  }


  async selectionSortSwap(array: number[]): Promise<void> {
    let n = array.length;
    this.state.mutate((state) => {
      state.list = array.map((value) => {
        return { value: value, state: 'middle' };
      });
    })
    for (let i = 0; i < n; i++) {
      await new Promise(resolve => setTimeout(resolve, this.speed()));
      // Finding the smallest number in the subarray
      let min = i;
      this.state.mutate((state) => {
        state.list[i].state = 'left';
        state.list = state.list.map((value, index) => {
          return { value: value.value, state: index > i ? 'middle' : value.state };
        })

        state.min = { value: array[i], state: 'left' };
      })
      for (let j = i + 1; j < n; j++) {
        await new Promise(resolve => setTimeout(resolve, this.speed()));
        this.state.mutate((state) => {
          state.list[j].state = 'left';
        })
        await new Promise(resolve => setTimeout(resolve, this.speed()));
        if (array[j] < array[min]) {
          this.state.mutate((state) => {
            state.list[min].state = 'disabled';
          })
          min = j;
          this.state.mutate((state) => {
            state.min = { value: array[min], state: 'left' };
          })
        } else {
          this.state.mutate((state) => {
            state.list[j].state = 'disabled';
          })
        }
      }
      await new Promise(resolve => setTimeout(resolve, this.speed()));
      if (min != i) {
        // Swapping the elements
        let tmp = array[i];
        this.state.mutate((state) => {
          state.temp = { value: tmp, state: 'middle' };
        })
        await new Promise(resolve => setTimeout(resolve, this.speed()));
        array[i] = array[min];
        this.state.mutate((state) => {
          state.list[i] = { value: array[i], state: 'right' };
        })
        await new Promise(resolve => setTimeout(resolve, this.speed()));
        array[min] = tmp;
        this.state.mutate((state) => {
          state.list[min] = { value: tmp, state: 'middle' };
        })

        // Introduce a this.speed() of 100ms
        await new Promise(resolve => setTimeout(resolve, this.speed()));
      } else {
        this.state.mutate((state) => {
          state.list[i].state = 'right';
        })
      }
    }
    this.state.mutate((state) => {
      state.sorted = true;
    })
    this._snackBar.open('Sorted', 'Close', {
      duration: 2000,
    })
  }

  startSimWithAppend() {
    this.choise = 'append'
    this.stateReset()
    const arr = this.randomArray(parseInt(this.getControl('startNumber').value), parseInt(this.getControl('endNumber').value));
    const speed = this.getControl('speed').value;
    this.selectionSortAppend(arr);
  }
  startSimWithSwap() {
    this.choise = 'swap'
    this.stateReset()
    const arr = this.randomArray(parseInt(this.getControl('startNumber').value), parseInt(this.getControl('endNumber').value));
    const speed = this.getControl('speed').value;
    this.selectionSortSwap(arr);
  }

}