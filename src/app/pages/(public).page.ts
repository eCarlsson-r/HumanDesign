import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TokenService } from '../core/api/token.service';
import { RouteMeta } from '@analogjs/router';
import { guestGuard } from '../core/guards/auth.guard';

export const routeMeta: RouteMeta = {
  canActivate: [guestGuard],
};

@Component({
  selector: 'public-layout',
  templateUrl: './public-layout.component.html',
  imports: [CommonModule, RouterOutlet, RouterLink],
  standalone: true
})
export default class PublicLayoutComponent {
  constructor(private token: TokenService) {}

  get isLoggedIn(): boolean {
    return this.token.isLoggedIn();
  }
}
