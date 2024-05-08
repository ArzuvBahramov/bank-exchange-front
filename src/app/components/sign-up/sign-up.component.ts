import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthDataService} from "../../services/data/auth/auth-data.service";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../model/request/login.request";
import {RegisterRequest} from "../../model/request/register.request";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isNotValidCredentials: boolean = false;

  constructor(private fb: FormBuilder,
              private authDataService: AuthDataService,
              private authService: AuthService,
              private router: Router) {
    this.signUpForm = this.fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const registerRequest: RegisterRequest = {
        firstname: this.signUpForm.get('firstname')?.value,
        lastname: this.signUpForm.get('lastname')?.value,
        username: this.signUpForm.get('username')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
      };
      this.authDataService.signUp(registerRequest).subscribe({
        next: (response) => {
          this.router.navigate(['/sign-in'])
        },
        error: (error) => {
          this.isNotValidCredentials = true;
          console.log(error);
        }
      });
    }
  }
}
