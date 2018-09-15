import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location} from '@angular/common';
import {Drink} from '../interface/drink';
import {DishService} from '../service/dish.service';
import {Subscription} from 'rxjs';
import {Pasta} from '../interface/pasta';
import {Product} from '../models/Product';
import {Type} from '../enum/type';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit, OnDestroy {
  drinks: Drink[];
  sub: Subscription;
  constructor(private dishService: DishService, private productService: ProductService,
              private location: Location) {}

  ngOnInit() {
    this.sub = this.dishService
      .getDrinksForClient()
      .subscribe((drink: Drink[]) => {
        this.drinks = drink;
      });
  }
  addToCart(event: Event, drink: Drink): void {
    const product = new Product();
    product.id = drink.id;
    product.type = Type.DRINK;
    product.price = drink.price;
    product.name = drink.name;
    this.productService.addToCart(product);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  goBack(): void {
    this.location.back();
  }
}
