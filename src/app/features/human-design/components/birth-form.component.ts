import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hd-birth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './birth-form.component.html'
})
export class BirthFormComponent {
  @Input() loading = false;
  @Output() submitted = new EventEmitter<any>();

  form = this.fb.group({
    FullName: '',
    Email: '',
    Phone: '',
    BirthDate: '',
    BirthTime: '',
    BirthLocation: ''
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    console.log("Submitting", this.form.value);
    this.submitted.emit(this.form.value);
  }
}
