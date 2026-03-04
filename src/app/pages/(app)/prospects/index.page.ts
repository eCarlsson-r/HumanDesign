import { Component, OnInit } from '@angular/core';
import { ProspectApiService } from '../../../core/api/prospect-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-prospect-list',
  templateUrl: './prospect-list.component.html',
  imports: [CommonModule, FormsModule]
})
export class ProspectListComponent implements OnInit {

  prospects: any[] = [];
  total = 0;
  page = 1;
  pageSize = 20;
  search = '';
  loading = false;

  constructor(private api: ProspectApiService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;

    this.api.getProspects(this.page, this.pageSize, this.search)
      .subscribe(res => {
        this.prospects = res.items;
        this.total = res.total;
        this.loading = false;
      });
  }

  onSearch() {
    this.page = 1;
    this.load();
  }

  next() {
    this.page++;
    this.load();
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
}
