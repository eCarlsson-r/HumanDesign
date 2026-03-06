import { Component, OnInit, signal } from '@angular/core';
import { ProspectApiService } from '../../../core/api/prospect-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'admin-prospect-list',
  templateUrl: './prospect-list.component.html',
  imports: [CommonModule, FormsModule, RouterLink]
})
export default class ProspectListComponent implements OnInit {

  prospects = signal<any[]>([]);
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
        this.prospects.set(res.items);
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
