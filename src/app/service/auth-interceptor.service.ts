import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private tokenSer: TokenService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes("Token") ||
      request.url.includes('https://api.ipify.org/?format=json')
    ) {
      return next.handle(request);
    }
    const token:any = sessionStorage.getItem("token");
    request = this.addToken(request, token);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `bearer ${token}`,
      },
    });
  }
}
