import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AgentService } from '../../../core/api/agent-api.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'crm-agent-list',
  templateUrl: './agent-list.component.html',
  imports: [CommonModule, FormsModule, DatePipe, RouterLink]
})
export default class AgentListComponent implements OnInit {

  agents = signal<any[]>([]);
  total = 0;
  page = 1;
  pageSize = 20;
  search = '';
  loading = false;

  constructor(private api: AgentService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;

    this.api.getAgents(this.page, this.pageSize, this.search).subscribe(res => {
      this.agents.set(res.items);
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
