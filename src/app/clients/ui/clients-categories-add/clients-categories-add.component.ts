import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersKeyword } from '../../utils/models/users-keywords.model';


@Component({
  selector: 'app-clients-categories-add',
  templateUrl: './clients-categories-add.component.html',
  styleUrls: ['./clients-categories-add.component.css']
})
export class ClientsCategoriesAddComponent {

  // send the selected keywords to the client-categories component
  @Output() newkeywordEvent = new EventEmitter<UsersKeyword>();

  addCategory: any = new FormGroup({
    newCategory: new FormControl('', Validators.required),
  })

  keywords: UsersKeyword = { keywords: 'Angular' }
   
  
  // send the selected keywords to client-categories component when the selection changes
  onSubmit() {
    this.keywords.keywords = this.addCategory.get('newCategory').value;
    this.newkeywordEvent.emit(this.keywords);
  }

}
