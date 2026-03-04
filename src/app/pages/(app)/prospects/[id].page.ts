import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProspectApiService } from '../../../core/api/prospect-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'crm-prospect-detail',
  templateUrl: './prospect-detail.component.html',
  imports: [CommonModule]
})
export class ProspectDetailComponent implements OnInit {

  prospect: any;

  constructor(
    private route: ActivatedRoute,
    private api: ProspectApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.api.getProspect(id).subscribe(res => this.prospect = res);
  }
}
