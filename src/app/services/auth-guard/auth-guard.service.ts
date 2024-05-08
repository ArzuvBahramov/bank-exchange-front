import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getRouter(): Router {
    return this.router;
  }
}
