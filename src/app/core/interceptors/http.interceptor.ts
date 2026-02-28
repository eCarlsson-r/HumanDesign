import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cloned = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(cloned);
  }
}
