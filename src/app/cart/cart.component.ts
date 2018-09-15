import { Component, OnInit } from '@angular/core';
import {Product} from '../models/Product';
import {ProductService} from '../service/product.service';
import {Pasta} from '../interface/pasta';
import {Drink} from '../interface/drink';
import {Pizza} from '../interface/pizza';
import {DishService} from '../service/dish.service';
import {Observable} from 'rxjs';
import {Type} from '../enum/type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products = Array<Product>();
  drinks: Drink[];
  pastas: Pasta[];
  pizzas: Pizza[];

  constructor(private productService: ProductService, private dishService: DishService) {
  }

  ngOnInit() {
    this.products = this.productService.getAllProducts();

    this.products.forEach((product: Product) => {
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
  }

  /**
   * counts sum of products in cart
   */
  getTotalPrice(): Number {
    return this.products
      .map((product: Product) => +product.price)
      .reduce((a, b) => a + b, 0);
  }

  /**
   * removes product assigned to button
   * @param product from template
   * @param i - index
   */
  removeProductFromCart(product: Product, i: number): void {
    this.removeProductsFromArray(product);
    this.productService.removeProductFromCartOnLocalStorage(i);
  }

  /**
   * removes product from list of products
   * @param product from template
   */
  removeProductsFromArray(product: Product): void {
    this.products = this.products.filter(
      item => item !== product
    );
  }
}
