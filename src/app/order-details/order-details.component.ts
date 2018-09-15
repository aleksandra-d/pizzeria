import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../service/order.service';
import {ActivatedRoute} from '@angular/router';
import {DishService} from '../service/dish.service';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Order} from '../models/Order';
import {Product} from '../models/Product';
import {Type} from '../enum/type';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  private id: string;
  private sub: Subscription;
  order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dishService: DishService,
    private location: Location
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.sub = this.orderService
      .getById(this.id)
      .subscribe((order: Order) => {
        this.order = order;
        this.order.products.forEach((product: Product) => {
          let products: Observable<any>;
          switch (product.type) {
            case Type.PASTA:
              products = this.dishService.getPastaById(product.id);
              break;
            case Type.PIZZA:
              products = this.dishService.getPizzaById(product.id);
              break;
            case Type.DRINK:
              products = this.dishService.getDrinkById(product.id);
              break;
          }

          products.subscribe((pasta) => {
            product.name = pasta.name;
            product.description = pasta.description;
          });
        });
      });
  }
  getTotalPrice(): Number {
    return this.order.products
      .map((product: Product) => +product.price)
      .reduce((a, b) => a + b, 0);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

}
