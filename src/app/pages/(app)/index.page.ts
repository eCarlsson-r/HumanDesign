import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../core/api/auth.service';

@Component({
  template: `
    <div class="container">
      <h1>Human Design Chart Generator</h1>
    </div>
  `
})
export default class HomePage implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    const role = this.auth.getRole();
    console.info(this.auth);

    if (role === 'Admin') this.router.navigate(['/app/admin-dashboard']);
    else if (role === 'Leader') this.router.navigate(['/app/leader-dashboard']);
    else if (role === 'Agent') this.router.navigate(['/app/agent-dashboard']);
    else this.router.navigate(['/report/']);
  }
}
