import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as List from '../../utils/list';

@Component({
  selector: 'app-degree-details-form',
  templateUrl: './degree-details-form.component.html',
  styleUrls: ['./degree-details-form.component.css'],
})
export class DegreeDetailsFormComponent {
  @Input() FormGroup!: FormGroup;
  @Input() type = 'degree';
  universitiesList = List.universitiesAndInstitutionsList;
  gradeList = List.gradeList;
  highschoolCertificateList = List.highschoolCertificateList;
  languageList = List.languageList;

  years = Array.from({ length: 82 }, (_, i) => (2031 - i).toString());
  getControl(controlName: string): FormControl {
    return this.FormGroup.get(controlName) as FormControl;
  }
}
