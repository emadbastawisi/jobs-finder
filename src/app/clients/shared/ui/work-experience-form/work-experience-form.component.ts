import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as list from '../../../feature/clients-setup/utils/list';
import { UserWorkExperience } from 'src/app/clients/utils/models/userProfile.models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.css'],
})
export class WorkExperienceFormComponent implements OnInit {
  @Output() save = new EventEmitter<UserWorkExperience>();
  @Output() update = new EventEmitter<UserWorkExperience>();
  @Output() cancel = new EventEmitter();
  edit: boolean = false;
  experienceTypeList = list.experienceTypeList;
  jobCategoryList = list.categoriesList;

  fb = inject(FormBuilder);

  workExperienceForm: FormGroup;
  getControl(controlName: string): FormControl {
    return this.workExperienceForm.get(controlName) as FormControl;
  }
  constructor(
    @Optional() public dialogRef: MatDialogRef<WorkExperienceFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.workExperienceForm = this.fb.group({
      id: [],
      job_title: ['', Validators.required],
      company_name: ['', Validators.required],
      job_category: [[], Validators.required],
      experience_type: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      work_there: [false]
    })
    if (data) {
      console.log(data)
      this.workExperienceForm.patchValue(data.workExperience);
      this.edit = true
    }
  }

  ngOnInit(): void {
    if (this.workExperienceForm.get('work_there')?.value) {
      this.workExperienceForm.removeControl('end_date');
    }
  }
  onWorkThereChange(event: any) {
    console.log(event);
    if (event.checked) {
      this.workExperienceForm.removeControl('end_date');
    } else {
      this.workExperienceForm.addControl('end_date', new FormControl(''));
    }
  }

  onSave() {
    if (this.edit) {
      this.update.emit(this.workExperienceForm.getRawValue());
      console.log(this.workExperienceForm.getRawValue());
    } else {
      this.save.emit(this.workExperienceForm.getRawValue());
    }
  }
  onCancel() {
    if (this.edit) {
      this.dialogRef.close();
    } else {
      this.cancel.emit();
    }
  }

}
