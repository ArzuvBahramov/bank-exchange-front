import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthDataService} from "../data/auth/auth-data.service";
import {LoginRequest} from "../../model/request/login.request";
import {LoginResponse} from "../../model/response/login.response";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private currentTokenSubject: BehaviorSubject<string>;
  constructor(private router: Router) {
    this.currentTokenSubject = new BehaviorSubject<string>("");
  }

  login (loginResponse: LoginResponse) {
    this.currentTokenSubject.next(loginResponse.jwttoken);
    localStorage.setItem('token', loginResponse.jwttoken);
  }

  sigOut() {
    localStorage.removeItem("token");
    this.router.navigate(['/sign-in']);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  saveToken(token: string) {
    this.currentTokenSubject.next(token);
    localStorage.setItem('token', token);
  }
}
