import {Component, OnInit} from '@angular/core';
import {User} from "./model/user.model";
import {AuthDataService} from "./services/data/auth/auth-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  user: User;

  constructor(private authService: AuthDataService) {
    this.user = {
      id: 0,
      firstname: '',
      lastname: '',
      username: '',
      email: ''
    }
  }

  loadUserDetails() {
    this.authService.getDetails().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err) => {
        console.log(err);
        throw (err);
      }
    });
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }
}
