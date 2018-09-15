import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pasta} from '../interface/pasta';
import { Location} from '@angular/common';
import {DishService} from '../service/dish.service';
import {Subscription} from 'rxjs';
import {Product} from '../models/Product';
import {Type} from '../enum/type';
import {ProductService} from '../service/product.service';


@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.component.html',
  styleUrls: ['./pasta.component.scss']
})
export class PastaComponent implements OnInit, OnDestroy {
  pastas: Pasta[];
  sub: Subscription;

  constructor(private dishService: DishService, private productService: ProductService,
              private location: Location) {}

  ngOnInit() {
    this.sub = this.dishService
      .getPastasForClient()
      .subscribe((data: Pasta[]) => {
        this.pastas = data;
      });
  }

  /**
   *
   * @param event
   * @param pasta
   */
  addToCart(event: Event, pasta: Pasta): void {
    const product = new Product();
    product.id = pasta.id;
    product.type = Type.PASTA;
    product.price = pasta.price;
    product.name = pasta.name;
    this.productService.addToCart(product);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * leads to previous page
   */
  goBack() {
    this.location.back();
  }

}
