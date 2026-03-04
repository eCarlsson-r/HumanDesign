import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { TokenService } from '../api/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const publicUrls = ['/', '/login', '/register']; // Example public URLs

    // Check if the request URL is in the public URLs list
    if (publicUrls.some(url => req.url.includes(url))) {
      return next.handle(req); // Pass the request without modification
    }

    const token = this.token.get();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
