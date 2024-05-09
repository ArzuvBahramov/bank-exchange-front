import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthDataService} from "../../services/data/auth/auth-data.service";
import {TokenService} from "../../services/token/token.service";
import {Router} from "@angular/router";
import {RegisterRequest} from "../../model/request/register.request";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy  {
  signUpForm!: FormGroup;
  isNotValidCredentials: boolean = false;
  private destroy$!: Subject<void>;

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.destroy$ = new Subject<void>();
  }

  constructor(private fb: FormBuilder,
              private authDataService: AuthDataService,
              private authService: TokenService,
              private router: Router) {
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
      this.authDataService.signUp(registerRequest).pipe(takeUntil(this.destroy$)).subscribe(
          (response) => this.router.navigate(['/sign-in']));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
