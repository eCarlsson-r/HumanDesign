import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouteMeta } from '@analogjs/router';
import { AuthService } from "../../core/api/auth.service";
import { guestGuard } from '../../core/guards/auth.guard';

export const routeMeta: RouteMeta = {
  canActivate: [guestGuard],
};

@Component({
  selector: 'app-login',
  template: `
  <div class="flex min-h-screen h-full items-center justify-center">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow grid gap-6">
      <h2>Login</h2>

      <input [(ngModel)]="email" placeholder="Email" class="border p-3 rounded-lg w-full" />
      <input [(ngModel)]="password" type="password" placeholder="Password" class="border p-3 rounded-lg w-full" />

      <button (click)="login()" class="bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700">Login</button>
    </div>
  </div>`,
  imports: [FormsModule]
})
export default class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  email = '';
  password = '';
  loading = false;

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert("Invalid credentials")
    });
  }
}
