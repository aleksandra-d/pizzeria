import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(private auth: AuthenticationService) {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.auth.isLoggedInChange.subscribe(value => {
      const user = this.auth.getCurrentUser();
      this.isLoggedIn = value;
      this.isAdmin = user && user.isAdmin;
    });
  }

  ngOnInit() {}

  /**
   * returns user
   */
  getUserType(): string {
    return this.isAdmin ? 'admin' : 'user';
  }
}
