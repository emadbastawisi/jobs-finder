import { Component, EventEmitter, Inject, Input, Optional, Output, inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { languageList, proficiencyLevelList } from 'src/app/clients/feature/clients-setup/utils/list';
import { UserLanguage } from 'src/app/clients/utils/models/userProfile.models';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css']
})
export class LanguageFormComponent {
  @Input() languageForm: FormGroup;
  @Output() save = new EventEmitter<UserLanguage>();
  @Output() update = new EventEmitter<UserLanguage>();
  fb = inject(FormBuilder);
  languageList = languageList
  proficiencyLevelList = proficiencyLevelList

  edit: boolean = false

  constructor(
    @Optional() public dialogRef: MatDialogRef<LanguageFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.languageForm = this.fb.group({
      id: [],
      language: ['', Validators.required],
      proficiency: ['', Validators.required]
    })
    if (data) {
      this.languageForm.patchValue(data.language);
      this.edit = true
    }
  }
  getControl(controlName: string): FormControl {
    return this.languageForm.get(controlName) as FormControl;
  }
  onSave() {
    if (this.edit) {
      this.update.emit(this.languageForm.getRawValue());
      console.log(this.languageForm.getRawValue());
    } else {
      this.save.emit(this.languageForm.getRawValue());
    }
  }
}
