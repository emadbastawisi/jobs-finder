import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserLanguage } from 'src/app/clients/utils/models/userProfile.models';

@Component({
  selector: 'app-language-card',
  templateUrl: './language-card.component.html',
  styleUrls: ['./language-card.component.css']
})
export class LanguageCardComponent {
  @Input() language!: UserLanguage;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<UserLanguage>();

  onDelete() {
    this.delete.emit(this.language.id);
  }
  onUpdate() {
    this.update.emit(this.language);
  }
}
