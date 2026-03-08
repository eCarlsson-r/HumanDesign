import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgentService } from '../../../core/api/agent-api.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agent-detail.component.html'
})
export default class AgentEditPage implements OnInit {

  form!: FormGroup;
  id!: string;
  leaders:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private agent: AgentService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      fullName: [''],
      email: [''],
      role: ['Agent'],
      parentId: ['']
    });

    this.agent.getAgent(this.id).subscribe((res:any) => {
      this.form.patchValue(res);
    });

    this.agent.getLeaders().subscribe((res:any) => {
      this.leaders = res;
    });

  }

  save() {

    this.agent.updateAgent(this.id, this.form.value)
      .subscribe(() => {
        this.router.navigate(['/agents']);
      });

  }

}
