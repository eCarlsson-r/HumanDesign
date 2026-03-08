import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "../api/token.service";
import { AuthService } from "../api/auth.service";

export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (!token.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const guestGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const auth = inject(AuthService);
  const router = inject(Router);

  if (token.isLoggedIn()) {
    const role = auth.getRole();
    console.info("Role : ", role, auth.getUserId());

    if (role === 'User') router.navigate(['/report', auth.getUserId()]);
    else router.navigate(['/dashboard']);
    return false;
  }
  return true;
};

export const roleGuard = (allowedRoles: string[]):CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!allowedRoles.includes(auth.getRole() || "")) {
      const role = auth.getRole();

      if (role === 'User') router.navigate(['/report', auth.getUserId()]);
      else router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
};
