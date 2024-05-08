import { Routes } from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {authGuard} from "./guards/guard/auth.guard";

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login', component: SignInComponent
  }
];
