import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  /**
   *
   * @param {Product} product
   */
  addToCart(product: Product): void {
    const products = JSON.parse(localStorage.getItem('cart')) || Array<Product>();

    products.push(product);

    localStorage.setItem('cart', JSON.stringify(products));
  }

  /**
   *
   * @param i - index
   */
  removeProductFromCartOnLocalStorage(i: number): void {
    const products = JSON.parse(localStorage.getItem('cart')) || Array<Product>();
    products.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(products));
  }
  /**
   *
   * @returns {Array<Product>}
   */
  getAllProducts(): Array<Product> {
    const products = JSON.parse(localStorage.getItem('cart')) || Array<Product>();

    return products;
  }

  /**
   * clears cart
   */
  clearCart(): void {
    localStorage.removeItem('cart');
  }

}
