import { Routes } from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {AuthGuardService} from "./guards/guard/auth.guard";
import {AppComponent} from "./app.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: AppComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

