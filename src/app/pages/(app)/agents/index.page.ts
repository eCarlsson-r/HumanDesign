import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'crm-agent-list',
  templateUrl: './agent-list.component.html',
  imports: [CommonModule, DatePipe]
})
export class AgentListComponent implements OnInit {

  agents: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/crm/users/agents')
      .subscribe(res => this.agents = res);
  }
}
