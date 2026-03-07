import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgentService } from '../../../core/api/agent-api.service';

@Component({
  imports: [ReactiveFormsModule],
  template: `
  <div class="container">

    <h2>Edit Agent</h2>

    <form [formGroup]="form" (ngSubmit)="save()">

      <label>Full Name</label>
      <input formControlName="fullName"/>

      <label>Email</label>
      <input formControlName="email" readonly/>

      <label>Role</label>
      <select formControlName="role">
        <option value="Agent">Agent</option>
        <option value="Leader">Leader</option>
      </select>

      <label>Parent Leader</label>

      <select formControlName="parentId">
        <option value="">None</option>

        <option *ngFor="let l of leaders" [value]="l.id">
          {{ l.fullName }}
        </option>

      </select>

      <button type="submit">Save</button>

    </form>

  </div>
  `
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
