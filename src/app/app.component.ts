import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "./model/user.model";
import {AuthDataService} from "./services/data/auth/auth-data.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  user!: User;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthDataService) {
  }

  loadUserDetails() {
    this.authService.getDetails().pipe(takeUntil(this.destroy$))
        .subscribe((user) => this.user = user ?? this.DEFAULT_USER_CREDENTIALS)
  }

  ngOnInit(): void {
    this.user = this.DEFAULT_USER_CREDENTIALS;
    this.loadUserDetails();
  }

  DEFAULT_USER_CREDENTIALS = {
    id: 0,
    firstname: '',
    lastname: '',
    username: 'USERNAME',
    email: ''
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
