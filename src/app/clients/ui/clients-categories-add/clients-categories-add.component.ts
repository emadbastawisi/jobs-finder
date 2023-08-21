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

  addCategory: any = new FormGroup({
    newCategory: new FormControl('', Validators.required),
  })
  // send the selected keywords to client-categories component when the selection changes
  onSubmit() {
    this.newkeywordEvent.emit(this.addCategory.get('newCategory').value);
  }

}
