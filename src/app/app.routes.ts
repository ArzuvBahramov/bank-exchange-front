import { Routes } from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {AuthGuardService} from "./guards/guard/auth.guard";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: AppComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: SignInComponent
  }
];

