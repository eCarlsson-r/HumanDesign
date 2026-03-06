import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TokenService } from '../../core/api/token.service';
import { AuthService } from '../../core/api/auth.service';
import { RouteMeta } from '@analogjs/router';
import { authGuard } from '../../core/guards/auth.guard';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  standalone: true,
  selector: 'index',
  template: ``
})
export default class AppIndexPage implements OnInit {

  constructor(private router: Router, private token: TokenService, private auth: AuthService) {}

  ngOnInit() {

    if (!this.token.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const role = this.auth.getRole();

    if (role === 'User')
      this.router.navigate(['/my-chart']);
    else
      this.router.navigate(['/dashboard']);

  }
}
