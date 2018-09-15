import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock;
  let authenticationService;

  const AuthenticationServiceStub = {
    login: () => of({ username: 'test', password: 'test', isAdmin: false }),
    logout: () => of(undefined),
    getCurrentUser: () => of({ username: 'test', password: 'test', isAdmin: false })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: AuthenticationServiceStub  }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    authenticationService = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
