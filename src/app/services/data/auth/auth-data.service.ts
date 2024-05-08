import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {LoginResponse} from "../../../model/response/login.response";
import {RegisterRequest} from "../../../model/request/register.request";
import {LoginRequest} from "../../../model/request/login.request";
import {User} from "../../../model/user.model";
import {environment} from "../../../../envirement/envirement";

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private apiUrl = `${environment.apiUrl}${environment.prefix}/auth`;

  constructor(private http: HttpClient) { }

  signIn(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/sign-in`, loginRequest);
  }

  signUp(registerRequest: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/sign-up`, registerRequest);
  }

  createRefreshToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/refresh-token`);
  }

  getDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/details`);
  }
}

