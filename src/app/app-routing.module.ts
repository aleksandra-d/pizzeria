import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PizzaComponent} from './pizza/pizza.component';
import {PastaComponent} from './pasta/pasta.component';
import {DrinkComponent} from './drink/drink.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PizzaDetailComponent} from './pizza-detail/pizza-detail.component';
import {LoginComponent} from './login/login.component';
import {CartComponent} from './cart/cart.component';
import {MenuComponent} from './menu/menu.component';
import {SummaryComponent} from './summary/summary.component';
import {ThankyouComponent} from './thankyou/thankyou.component';
import {PastaDetailComponent} from './pasta-detail/pasta-detail.component';
import {DrinkDetailComponent} from './drink-detail/drink-detail.component';
import {DishesListComponent} from './dishes-list/dishes-list.component';
import {OwnerComponent} from './owner/owner.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {AuthGuard} from './auth/auth.guard';
import {AdminGuard} from './auth/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'pizzas', component: PizzaComponent},
  { path: 'pastas', component: PastaComponent },
  { path: 'drinks', component: DrinkComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/pizzas/detail/:id', component: PizzaDetailComponent},
  {path: 'pizzas/detail/:id', component: PizzaDetailComponent},
  {path: 'pastas/detail/:id', component: PastaDetailComponent},
  {path: 'drinks/detail/:id', component: DrinkDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'owner', component: OwnerComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'owner/dishes', component: DishesListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'owner/orders', component: OrderListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'owner/orders/detail/:id', component: OrderDetailsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'thankyou', component: ThankyouComponent},
  {
    path: 'menu', component: MenuComponent, children: [{
      path: 'pizzas', component: PizzaComponent
    },
      {
        path: 'drinks', component: DrinkComponent
      },
      {
        path: 'pastas', component: PastaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
