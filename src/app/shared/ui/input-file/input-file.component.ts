import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [
    CommonModule,
    NgxMatFileInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent {
  @Input() Control: FormControl = new FormControl();
  @Input() accept: string = '';
  // @Input() multiple: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  dragover = false;
  success = false;
  getErrorMessage(key: any): string {
    return this.errorMessages[key as string];
  }
  errorMessages: { [key: string]: string } = {
    required: 'This field is required',
    invalidFileType: 'Unsupported file type',
    invalidFileSize:
      'Sorry, this file is too big your CV file must be less than 5MB',
  };

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    console.log('DragOver');
    event.preventDefault();
    event.stopPropagation();
    this.dragover = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    console.log('DragLeave');
    event.preventDefault();
    if (
      (event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)
    ) {
      return;
    }
    this.dragover = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    if (this.success) {
      return;
    }
    event.preventDefault();
    this.dragover = false;
    const files = event.dataTransfer!.files;
    this.Control.setValue(files);
    if (this.Control.valid) {
      //call api
      this.success = true;
    }
  }

  onFileInput(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files!.length > 0) {
      this.Control.setValue(files);
    }
    if (this.Control.valid) {
      //call api
      this.success = true;
    }
  }

  removeFile() {
    this.Control.setValue(null);
    // call api
    this.fileInput.nativeElement.value = '';
    this.success = false;
  }
  // remove for multiple files
  removeFileMultiple(index: number) {
    const files = Array.from(this.Control.value);
    files.splice(index, 1);
    this.Control.setValue(files);
    this.fileInput.nativeElement.value = '';
  }
}
