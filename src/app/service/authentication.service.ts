import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'http://localhost:3000';
  isLoggedInChange: Subject<boolean> = new Subject<boolean>();
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isLoggedInChange.subscribe((value: boolean) => this.isLoggedIn = value);
  }

  login(login: string, password: string): Observable<any> {
    return this.http
      .get<any>(`${this.url}/users?_limit=1&username=${login}&password=${password}`)
      .pipe(
        map((users: any) => {
          return users.filter(user => {
            if (user && user.password === password) {
              delete user.password;
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.isLoggedInChange.next(!!this.getCurrentUser());
              return user;
            }
          });
        }),
      );
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedInChange.next(!!this.getCurrentUser());
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
