import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as list from '../../../feature/clients-setup/utils/list';
import { UserWorkExperience } from 'src/app/clients/utils/models/userProfile.models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.css'],
})
export class WorkExperienceFormComponent implements OnInit {
  @Input() FormGroup!: FormGroup;
  @Output() save = new EventEmitter<UserWorkExperience>();
  @Output() update = new EventEmitter<UserWorkExperience>();
  @Output() cancel = new EventEmitter();
  edit: boolean = false;
  experienceTypeList = list.experienceTypeList;
  jobCategoryList = list.categoriesList;


  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
  constructor(
    @Optional() public dialogRef: MatDialogRef<WorkExperienceFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.FormGroup = data.FormGroup;
      this.edit = true
    }
  }

  ngOnInit(): void {
    if (this.FormGroup.get('work_there')?.value) {
      this.FormGroup.removeControl('end_date');
    }
  }
  onWorkThereChange(event: any) {
    console.log(event);
    if (event.checked) {
      this.FormGroup.removeControl('end_date');
    } else {
      this.FormGroup.addControl('end_date', new FormControl(''));
    }
  }

  onSave() {
    if (this.edit) {
      this.update.emit(this.FormGroup.getRawValue());
      console.log(this.FormGroup.getRawValue());
    } else {
      this.save.emit(this.FormGroup.getRawValue());
    }
  }
  onCancel() {
    if (this.edit) {
      this.FormGroup.reset();
      this.dialogRef.close();
    } else {
      this.cancel.emit();
    }
  }

}
