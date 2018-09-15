import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../models/Order';
import {OrderService} from '../service/order.service';
import {interval, Subject, Subscription} from 'rxjs';
import {Product} from '../models/Product';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/internal/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Array<Order>;
  private sub: Subscription;
  private destroy$ = new Subject();
  loading = true;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getFreshOrders();

    const interval$ = interval(20000);

    interval$.pipe(takeUntil(this.destroy$))
      .subscribe(r => {
        this.loading = true;
        this.getFreshOrders();
      });
   // this.sub = this.orderService
   //    .getAll()
   //    .subscribe((orders: Array<Order>) => this.orders = orders);
  }
  getFreshOrders() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.orderService
      .getAll()
      .subscribe((orders: Array<Order>) => {
          this.orders = orders;
          this.loading = false;
        }
      );
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.destroy$.next(true);
  }
  getTotalPrice(order: Order): Number {
    return order.products
      .map((product: Product) => +product.price)
      .reduce((a, b) => a + b, 0);
  }
  clickEditHandler(event: Event, id: number) {
    /**
     * TODO dopisać obsługę
     */
  }
  clickRemoveHandler(event: Event, id: number) {
    /**
     * TODO dopisać obsługę
     */
  }
}
