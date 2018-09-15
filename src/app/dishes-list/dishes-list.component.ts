import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pizza} from '../interface/pizza';
import {Pasta} from '../interface/pasta';
import {Drink} from '../interface/drink';
import {Subscription} from 'rxjs';
import {DishService} from '../service/dish.service';
import { Location} from '@angular/common';


@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})
export class DishesListComponent implements OnInit, OnDestroy {
  pizzas: Pizza[];
  pastas: Pasta[];
  drinks: Drink[];
  sub: Subscription;

  constructor(private dishService: DishService, private location: Location) { }

  ngOnInit() {
    this.sub = this.dishService
      .getPizzasForOwner()
      .subscribe((data: Pizza[]) => {
        console.log(data);
        this.pizzas = data;
      });
    this.sub = this.dishService
      .getPastasForOwner()
      .subscribe((data: Pasta[]) => {
        console.log(data);
        this.pastas = data;
      });
    this.sub = this.dishService
      .getDrinksForOwner()
      .subscribe((data: Drink[]) => {
        console.log(data);
        this.drinks = data;
      });
}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  goBack(): void {
    this.location.back();
  }
}
