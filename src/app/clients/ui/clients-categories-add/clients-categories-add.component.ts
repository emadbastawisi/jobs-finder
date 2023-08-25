import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-clients-categories-add',
  templateUrl: './clients-categories-add.component.html',
  styleUrls: ['./clients-categories-add.component.css']
})
export class ClientsCategoriesAddComponent {

  // send the new keyword to the client-categories component
  @Output() newkeywordEvent = new EventEmitter<string>();

  addCategory: FormGroup = new FormGroup({
    newCategory: new FormControl<string>('', [Validators.minLength(3)]),
  })
  // send the selected keywords to client-categories component when the selection changes
  onSubmit(formDirective: any) {
    this.newkeywordEvent.emit(this.addCategory.get('newCategory')!.value);
    this.addCategory.reset();
    formDirective.resetForm();
  }

}
