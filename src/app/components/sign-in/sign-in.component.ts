import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthDataService} from "../../services/data/auth/auth-data.service";
import {LoginRequest} from "../../model/request/login.request";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm: FormGroup;
  isNotValidCredentials: boolean;

  constructor(private fb: FormBuilder,
              private authDataService: AuthDataService,
              private authService: AuthService,
              private router: Router) {
    this.signInForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.isNotValidCredentials = false;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const loginRequest: LoginRequest = {
        username: this.signInForm.get('username')?.value,
        password: this.signInForm.get('password')?.value
      };
      this.authDataService.signIn(loginRequest).subscribe({
        next: (response) => {
          this.authService.login(response);
          this.router.navigate(['/app'])
        },
        error: (error) => {
          this.isNotValidCredentials = true;
          console.log(error);
        }
      });
    }
  }
}
