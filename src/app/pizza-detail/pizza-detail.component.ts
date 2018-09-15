import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pizza} from '../interface/pizza';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../service/dish.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {State} from '../enum/state';
import {AuthenticationService} from '../service/authentication.service';


@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.scss']
})
export class PizzaDetailComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  @Input() pizza: Pizza;
  isAdmin = false;
  isLoggedIn = false;

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private dishService: DishService,
    private location: Location
  ) {
    this.auth.isLoggedInChange.subscribe(
      value => {
        const user = this.auth.getCurrentUser();
        this.isLoggedIn = value;
        this.isAdmin = user && user.isAdmin;
      }
    );
  }

  ngOnInit(): void {
    this.getPizza();
  }

  getPizza(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dishService.getPizza(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(pizza => this.pizza = pizza);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.dishService.updatePizza(this.pizza)
      .subscribe(() => this.goBack());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
