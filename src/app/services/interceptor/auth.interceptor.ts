import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {TokenService} from "../token/token.service";
import {AuthDataService} from "../data/auth/auth-data.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: TokenService,
              private authService: AuthDataService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const authReq = this.addTokenHeader(req, token);

      return next.handle(authReq).pipe(catchError((err) => {
        if (err instanceof HttpErrorResponse && !authReq.url.includes('auth/sign-in') &&
            !authReq.url.includes('auth/sign-up') && err.status === 401) {
          return this.handle401Error(authReq, next);
        }
        this.tokenService.sigOut();
        return throwError(err);
      }));
    }

    return next.handle(req);
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getToken();

      if (token)
        return this.authService.createRefreshToken().pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;

              this.tokenService.login(token);
              this.refreshTokenSubject.next(token.jwttoken);

              return next.handle(this.addTokenHeader(req, token.jwttoken));
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.tokenService.sigOut();
              return throwError(err);
            })
        );
    }

    return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(req, token)))
    );
  }
  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

}

