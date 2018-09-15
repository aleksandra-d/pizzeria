import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DishService } from './service/dish.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PastaComponent } from './pasta/pasta.component';
import { DrinkComponent } from './drink/drink.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { SummaryComponent } from './summary/summary.component';
import { MenuComponent } from './menu/menu.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PastaDetailComponent } from './pasta-detail/pasta-detail.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import {AuthenticationService} from './service/authentication.service';
import { OwnerComponent } from './owner/owner.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {AuthGuard} from './auth/auth.guard';
import {AdminGuard} from './auth/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    PastaComponent,
    DrinkComponent,
    PizzaDetailComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    CartComponent,
    SummaryComponent,
    MenuComponent,
    ThankyouComponent,
    PastaDetailComponent,
    DrinkDetailComponent,
    DishesListComponent,
    OwnerComponent,
    OrderListComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthenticationService,
    DishService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
