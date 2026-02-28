import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BirthFormComponent } from '../features/human-design/components/birth-form.component';
import { ProspectService } from '../features/human-design/services/prospect.service';

@Component({
  standalone: true,
  imports: [BirthFormComponent],
  template: `
    <div class="container">
      <h1>Human Design Chart Generator</h1>

      <hd-birth-form (submitted)="generateChart($event)"></hd-birth-form>
    </div>
  `
})
export default class HomePage {

  private router = inject(Router);
  private prospectService = inject(ProspectService);

  generateChart(data: any) {
    this.prospectService.setCurrent(data);
    this.router.navigate(['/chart']);
  }
}
