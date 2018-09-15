import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {Product} from '../models/Product';
import {Type} from '../enum/type';
import {empty} from 'rxjs/internal/Observer';
import any = jasmine.any;

describe('ProductService', () => {
  let service: ProductService;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
    service = TestBed.get(ProductService);
    store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    localStorage.removeItem('cart');
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  describe('addToCart', () => {
    it('should be defined', () => {
      expect(service.addToCart).toBeDefined();
    });
    it('should add to cart', () => {
      const product = new Product();
      product.name = 'spaghetti';
      product.price = 20;
      product.id = 1;
      product.type = Type.PASTA;
      product.description = 'hot';
      service.addToCart(product);

      expect(localStorage.getItem('cart')).toEqual(JSON.stringify([product]));
    });
    it('should not add to cart', () => {
      const product = new Product();
      product.name = 'spaghetti';
      product.price = 20;
      product.id = 1;
      product.type = Type.PASTA;
      product.description = 'hot';
      service.addToCart(product);

      expect(localStorage.getItem('cart')).not.toEqual(JSON.stringify(product));
    });
  });

  describe('removeProductFromCartOnLocalStorage', () => {
    it('should be defined', () => {
      expect(service.removeProductFromCartOnLocalStorage).toBeDefined();
    });
    it('should remove product from cart on localStorage', () => {
      const product = new Product();
      product.name = 'spaghetti';
      product.price = 20;
      product.id = 1;
      product.type = Type.PASTA;
      product.description = 'hot';

      service.addToCart(product);
      service.addToCart(product);

      expect(JSON.parse(localStorage.getItem('cart'))).toEqual(JSON.parse(JSON.stringify([product, product])));
      service.removeProductFromCartOnLocalStorage(1);
      expect(JSON.parse(localStorage.getItem('cart'))).not.toEqual(JSON.parse(JSON.stringify([product, product])));
    });

    it('should not remove product from cart on localStorage', () => {
      const product = new Product();
      product.name = 'spaghetti';
      product.price = 20;
      product.id = 1;
      product.type = Type.PASTA;
      product.description = 'hot';

      service.addToCart(product);
      service.addToCart(product);

      expect(JSON.parse(localStorage.getItem('cart'))).toEqual(JSON.parse(JSON.stringify([product, product])));
      service.removeProductFromCartOnLocalStorage(100);
      expect(JSON.parse(localStorage.getItem('cart'))).toEqual(JSON.parse(JSON.stringify([product, product])));
    });

  });
  describe('getAllProducts', () => {
    it('should be defined', () => {
      expect(service.getAllProducts).toBeDefined();
    });
    it('should get all products from cart on local storage', () => {
      const product = new Product();
      let products = Array<Product>();
      product.name = 'spaghetti';
      product.price = 20;
      product.id = 1;
      product.type = Type.PASTA;
      product.description = 'hot';

      service.addToCart(product);
      service.addToCart(product);

      expect(JSON.parse(localStorage.getItem('cart'))).toEqual(JSON.parse(JSON.stringify([product, product])));
      products =  service.getAllProducts();
      expect(JSON.parse(localStorage.getItem('cart'))).toEqual(JSON.parse(JSON.stringify(products)));
    });

  });
  describe('clearCart', () => {
    it('should be defined', () => {
      expect(service.clearCart).toBeDefined();
    });
    it('should clear cart on local storage', () => {
      const product = new Product();
      product.name = 'spaghetti';
      product.price = 20;
      product.id = 1;
      product.type = Type.PASTA;
      product.description = 'hot';

      service.addToCart(product);
      service.addToCart(product);

      expect(JSON.parse(localStorage.getItem('cart'))).toEqual(JSON.parse(JSON.stringify([product, product])));
      service.clearCart();
      expect(JSON.parse(localStorage.getItem('cart'))).not.toEqual(JSON.parse(JSON.stringify([product, product])));
    });

  });
});
