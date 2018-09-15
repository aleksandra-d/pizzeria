import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pizza} from '../interface/pizza';
import {DishService} from '../service/dish.service';
import { Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {Product} from '../models/Product';
import {Type} from '../enum/type';
import {ProductService} from '../service/product.service';


@Component({
  selector: 'app-dish',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit, OnDestroy {
  pizzas: Pizza[];
  sub: Subscription;

  constructor(private dishService: DishService, private productService: ProductService,
              private location: Location) {}

  ngOnInit() {
    this.sub = this.dishService
      .getPizzasForClient()
      .subscribe((data: Pizza[]) => {
        console.log(data);
        this.pizzas = data;
      });
  }

  /**
   *
   * @param event
   * @param pizza
   */
  addToCart(event: Event, pizza: Pizza): void {
    const product = new Product();
    product.id = pizza.id;
    product.type = Type.PIZZA;
    product.price = pizza.price;
    product.name = pizza.name;
    this.productService.addToCart(product);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * leads to previous page
   */
  goBack(): void {
    this.location.back();
  }

}
