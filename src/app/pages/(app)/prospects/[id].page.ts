import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProspectApiService } from '../../../core/api/prospect-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'crm-prospect-detail',
  templateUrl: './prospect-detail.component.html',
  imports: [CommonModule, RouterLink]
})
export default class ProspectDetailComponent implements OnInit {

  prospect: any;

  constructor(
    private route: ActivatedRoute,
    private api: ProspectApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.api.getProspect(id).subscribe(res => {
      this.prospect = res;
      this.cdr.detectChanges();
    });
  }
}
