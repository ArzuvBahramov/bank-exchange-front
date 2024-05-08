import {CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthGuardService} from "../../services/auth-guard/auth-guard.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthGuardService(new Router());
  if (authService.isAuthenticated()) {
    return true;
  } else {
    authService.getRouter().navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
};
