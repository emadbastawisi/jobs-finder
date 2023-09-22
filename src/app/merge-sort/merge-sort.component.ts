import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface chip {
  value: number;
  state: string;
}
interface stepSate {
  layer: number
  devidePointer: number
  mergePointer: number
}

interface MergeSortState {
  devideList: chip[][][];
  mergeList: chip[][][];
  steps: stepSate[]
  devideStep: number
  mergeStep: number
  sorted: boolean
}

@Component({
  selector: 'app-merge-sort',
  templateUrl: './merge-sort.component.html',
  styleUrls: ['./merge-sort.component.css']
})
export class MergeSortComponent {

  FormGroup = new FormGroup({
    startNumber: new FormControl('', (Validators.required)),
    endNumber: new FormControl('', (Validators.required)),
    speed: new FormControl('', (Validators.required)),
  })
  speedList = [10, 50, 100, 200, 300, 400, 500, 1000]
  speed = signal<number>(this.speedList[0])
  step_count = 0
  setSpeed(speed: number) {
    this.speed.set(speed)
  }

  list = [
    [[1, 2, 3, 4, 5]],
    [[1, 2, 3], [4, 5]],
    [[1, 2], [3], [3], [4]],
  ]


  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
  state = signal<MergeSortState>({
    devideList: [],
    mergeList: [],
    steps: [],
    devideStep: 0,
    mergeStep: 0,
    sorted: false,
  })

  stateReset() {
    this.state.set({
      devideList: [],
      mergeList: [],
      steps: [],
      devideStep: 0,
      mergeStep: 0,
      sorted: false,
    })
  }

  getGridListColSpan() {
    return Math.pow(2, this.step_count - 1)
  }

  getColspan(num1: number, num2: number): number {
    return Math.floor(num1 / num2)
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
  async mergeSort(arr: number[]): Promise<number[]> {
    await new Promise(resolve => setTimeout(resolve, this.speed()));
    this.state.mutate((state) => {
      state.devideList[state.devideStep] = state.devideList[state.devideStep].map((value) => {
        value.map((item, index) => {
          if (item.value == arr[index]) {
            item.state = 'left'
          }
          return item
        })
        return value
      })
    })
    if (arr.length <= 1) {
      await new Promise(resolve => setTimeout(resolve, this.speed()));

      this.state.mutate((state) => {
        state.devideList[state.devideStep] = state.devideList[state.devideStep].map((value) => {
          value.map((item, index) => {
            if (item.value == arr[index]) {
              item.state = 'right'
            }
            return item
          })
          return value
        })
      })
      return arr;
    }
    await new Promise(resolve => setTimeout(resolve, this.speed()));
    this.state.mutate((state) => {
      state.devideList[state.devideStep] = state.devideList[state.devideStep].map((value) => {
        value.map((item, index) => {
          if (item.value == arr[index]) {
            item.state = 'disabled'
          }
          return item
        })
        return value
      })
    })

    this.state.mutate((state) => {
      state.devideStep++
    })
    const mid = Math.ceil(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    await new Promise(resolve => setTimeout(resolve, this.speed()));
    this.state.mutate((state) => {
      state.devideList[state.devideStep][state.steps[state.devideStep].devidePointer] =
        left.map(item => {
          return { value: item, state: 'middle' }
        })
      state.steps[state.devideStep].devidePointer++
    })
    await new Promise(resolve => setTimeout(resolve, this.speed()));
    this.state.mutate((state) => {
      state.devideList[state.devideStep][state.steps[state.devideStep].devidePointer] =
        right.map(item => {
          return { value: item, state: 'middle' }
        })
      state.steps[state.devideStep].devidePointer++
    })
    const result = this.merge(await this.mergeSort(left), await this.mergeSort(right));
    return result
  }

  async merge(left: number[], right: number[]): Promise<number[]> {
    let resultArray: number[] = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      await new Promise(resolve => setTimeout(resolve, this.speed()));
      this.state.mutate((state) => {
        state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 2] = state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 2]?.map((value) => {
          return { value: value.value, state: value.value === left[leftIndex] ? 'left' : value.state }
        })
        state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 1] = state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 1]?.map((value) => {
          return { value: value.value, state: value.value === right[rightIndex] ? 'left' : value.state }
        })
      })
      if (left[leftIndex] < right[rightIndex]) {
        await new Promise(resolve => setTimeout(resolve, this.speed()));
        resultArray.push(left[leftIndex]);
        this.state.mutate((state) => {
          state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 2] = state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 2]?.map((value) => {
            return { value: value.value, state: value.value === left[leftIndex] ? 'disabled' : value.state }
          })
          state.mergeList[this.step_count - state.devideStep - 1][state.steps[this.step_count - state.devideStep - 1].mergePointer] = resultArray.map(item => {
            return { value: item, state: 'middle' }
          })
        })
        leftIndex++;

      } else {
        await new Promise(resolve => setTimeout(resolve, this.speed()));
        resultArray.push(right[rightIndex]);
        this.state.mutate((state) => {
          state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 1] = state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 1]?.map((value) => {
            return { value: value.value, state: value.value === right[rightIndex] ? 'disabled' : value.state }
          })
          state.mergeList[this.step_count - state.devideStep - 1][state.steps[this.step_count - state.devideStep - 1].mergePointer] = resultArray.map(item => {
            return { value: item, state: 'middle' }
          })
        })
        rightIndex++;
      }
    }

    resultArray = resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
    await new Promise(resolve => setTimeout(resolve, this.speed()));
    if (this.state().steps[this.state().mergeStep].mergePointer > 1)
      this.state.mutate((state) => {
        state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 2] = state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 2]?.map((value) => {
          return { value: value.value, state: 'disabled' }
        })
        state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 1] = state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer - 1]?.map((value) => {
          return { value: value.value, state: 'disabled' }
        })
      })
    this.state.mutate((state) => {
      state.mergeStep = this.step_count - state.devideStep - 1
      state.mergeList[state.mergeStep][state.steps[state.mergeStep].mergePointer] = resultArray.map(item => {
        return { value: item, state: 'middle' }
      })
      state.steps[state.mergeStep].mergePointer++
      state.devideStep--
    })

    return resultArray
  }

  createList(i: number): never[][] {
    let list = []
    for (let j = 0; j < Math.pow(2, i); j++) {
      list.push([])
    }
    return list
  }
  async startSim(): Promise<void> {
    this.stateReset()
    let startNumber = parseInt(this.getControl('startNumber').value)
    let endNumber = parseInt(this.getControl('endNumber').value)
    this.step_count = Math.ceil(Math.log2(endNumber - startNumber + 1) + 1)
    let arr = this.randomArray(startNumber, endNumber)
    this.state.mutate((state) => {
      state.devideList[0] = [arr.map(item => {
        return { value: item, state: 'middle' }
      })]
      for (let i = 1; i < this.step_count; i++) {
        state.devideList[i] = this.createList(i)
      }
      for (let i = 0, j = this.step_count - 2; i < this.step_count - 1; i++, j--) {
        state.mergeList[i] = this.createList(j)
      }
      for (let i = 0; i < this.step_count; i++) {
        state.steps[i] = { layer: i, devidePointer: 0, mergePointer: 0 }
      }
    })

    await this.mergeSort(arr)
    console.log(this.state())
    this.state.mutate((state) => {
      state.sorted = true
    })

  }
}
