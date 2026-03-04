import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/api/auth.service';
import { authGuard } from '../core/guards/auth.guard';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [CommonModule, RouterOutlet, RouterLink],
  standalone: true
})
export default class AdminLayoutComponent {

  role = this.auth.getRole();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
