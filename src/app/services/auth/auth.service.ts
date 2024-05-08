import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthDataService} from "../data/auth/auth-data.service";
import {LoginRequest} from "../../model/request/login.request";
import {LoginResponse} from "../../model/response/login.response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentTokenSubject: BehaviorSubject<string>;
  constructor() {
    this.currentTokenSubject = new BehaviorSubject<string>("");
  }

  login (loginResponse: LoginResponse) {
    this.currentTokenSubject.next(loginResponse.jwttoken);
    localStorage.setItem('token', loginResponse.jwttoken);
  }

  getToken(): string {
    return this.currentTokenSubject.value;
  }
}
