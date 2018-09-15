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
  it(`should have as title 'pizza'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Welcome to Pizzeria Dynita');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Pizzeria Dynita');
  }));
});
