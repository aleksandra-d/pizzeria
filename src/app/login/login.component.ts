import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {first} from 'rxjs/internal/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.auth.logout();

    if (this.auth.isLoggedIn) {
      this.router.navigateByUrl('/login', { skipLocationChange: true });
    }

    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * handles login validation
   */
  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.f.login.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        users => {
          if (this.auth.isLoggedIn) {
            this.router.navigateByUrl('/owner', { skipLocationChange: true });
          }
          this.loginForm.setErrors({ 'incorrect': true });
          this.loginForm.controls.login.setErrors({ 'invalid': true });
          this.loginForm.controls.password.setErrors({ 'invalid': true });
        }
      );
  }

  /**
   * returns controls
   */
  get f() {
    return this.loginForm.controls;
  }
}
