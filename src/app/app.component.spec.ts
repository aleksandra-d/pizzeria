import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        NavbarComponent,
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixtureNavbar = TestBed.createComponent(NavbarComponent);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const navbar = fixture.debugElement.componentInstance;
    expect(navbar).toBeTruthy();
    expect(app).toBeTruthy();
  }));

});
