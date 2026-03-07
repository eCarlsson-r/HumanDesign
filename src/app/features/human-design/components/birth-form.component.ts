import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProspectApiService } from '../../../core/api/prospect-api.service';

@Component({
  selector: 'hd-birth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './birth-form.component.html'
})
export class BirthFormComponent {
  @Input() loading = false;
  @Output() submitted = new EventEmitter<any>();
  locations:any[] = [];

  form = this.fb.group({
    FullName: '',
    Email: '',
    Phone: '',
    BirthDate: '',
    BirthTime: '',
    BirthLocation: '',
    Latitude: '',
    Longitude: ''
  });

  constructor(
    private api: ProspectApiService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  searchLocation(event:any) {
    const query = event.target.value;

    if(query.length < 3) return;

    this.api.searchLocation(query)
      .subscribe((res:any) => {
        this.locations = res;
        this.cdr.detectChanges();
      }
    );
  }

  selectLocation(loc:any){

    this.form.patchValue({
      BirthLocation: loc.display_name,
      Latitude: loc.lat,
      Longitude: loc.lon
    });

    this.locations = [];
    this.cdr.detectChanges();
  }

  submit() {
    console.log("Submitting", this.form.value);
    this.submitted.emit(this.form.value);
  }
}
