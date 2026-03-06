import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../../core/api/api.service';

@Component({
  selector: 'crm-agent-list',
  templateUrl: './agent-list.component.html',
  imports: [CommonModule, DatePipe]
})
export default class AgentListComponent implements OnInit {

  agents: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<any[]>('agents').subscribe(res => this.agents = res);
  }
}
