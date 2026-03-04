import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expected = route.data['role'];
    const role = this.auth.getRole();

    if (role !== expected) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
