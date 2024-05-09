import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthDataService} from "../../services/data/auth/auth-data.service";
import {LoginRequest} from "../../model/request/login.request";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {TokenService} from "../../services/token/token.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm!: FormGroup;
  isNotValidCredentials!: boolean;
  private destroy$!: Subject<void>;

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.isNotValidCredentials = false;
    this.destroy$ = new Subject<void>();
  }

  constructor(private fb: FormBuilder,
              private authDataService: AuthDataService,
              private authService: TokenService,
              private app: AppComponent,
              private router: Router) {

  }

  onSubmit() {
    if (this.signInForm.valid) {
      const loginRequest: LoginRequest = {
        username: this.signInForm.get('username')?.value,
        password: this.signInForm.get('password')?.value
      };
      this.authDataService.signIn(loginRequest).pipe(takeUntil(this.destroy$)).subscribe(
        (response) =>  {
          this.authService.login(response);
          this.app.loadUserDetails();
          this.router.navigate(['/app'])
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
