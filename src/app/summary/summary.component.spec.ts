import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import {SummaryComponent} from './summary.component';
import {ProductService} from '../service/product.service';
import {OrderService} from '../service/order.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import {ReactiveFormsModule, FormsModule, FormArray, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {Product} from '../models/Product';
import {Type} from '../enum/type';
import {Order} from '../models/Order';
import {OrderStatus} from '../enum/orderStatus';
import {IClientInfo} from '../interface/IClientInfo';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let productService;
  let orderService;
  let domElement: any;
  let httpMock;
  let product;
  let productServiceSpy;
  let orderServiceSpy;
  let order;

  beforeEach(async(() => {
    product = new Product();
    product.name = 'spaghetti';
    product.price = 20;
    product.id = 1;
    product.type = Type.PASTA;
    product.description = 'hot';

    order = new Order();
    order.state = OrderStatus.WAITING;
    order.products = [product, product];
    order.clientInfo = {
      name: 'ala',
      surname: 'ala',
      street: 'ala',
      postalCode: 'ala',
      city: 'ala',
      phone: 'ala'
    } as IClientInfo;


    productServiceSpy = jasmine.createSpyObj(
      'productService',
      [
        'getAllProducts',
        'clearCart'
      ]
    );
    orderServiceSpy = jasmine.createSpyObj(
      'orderService',
      [
        'add'
      ]
    );

    productServiceSpy.getAllProducts.and.returnValue([product, product]);
    productServiceSpy.clearCart.and.returnValue(of(undefined));
    orderServiceSpy.add.and.returnValue(of(order));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [SummaryComponent],
      providers: [
        {provide: ProductService, useValue: productServiceSpy},
        {provide: OrderService, useValue: orderServiceSpy}
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    productService = TestBed.get(HttpTestingController);
    orderService = TestBed.get(HttpTestingController);
    domElement = fixture.nativeElement;
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

  it('should returns product items', inject([ProductService], (service: ProductService) => {
    expect(component.productItems).toEqual([product, product]);
    expect(service.getAllProducts).toHaveBeenCalled();
  }));

  describe('summaryForm', () => {
    it('should exist summary form', () => {
      expect(component.summaryForm).toBeDefined();
    });

    it('should summary form invalid when empty', () => {
      expect(component.summaryForm.valid).toBeFalsy();
    });
    it('name should be valid', () => {
      let errors = {};
      const name = component.summaryForm.controls.name;

      expect(name.valid).toBeFalsy();
      // name field is required
      errors = name.errors || {};
      expect(errors['required']).toBeTruthy();
      name.setValue('ala');
      errors = name.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('surname should be valid', () => {
      let errors = {};
      const surname = component.summaryForm.controls.surname;

      expect(surname.valid).toBeFalsy();
      // surname field is required
      errors = surname.errors || {};
      expect(errors['required']).toBeTruthy();
      surname.setValue('maKota');
      errors = surname.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('street should be valid', () => {
      let errors = {};
      const street = component.summaryForm.controls.street;

      expect(street.valid).toBeFalsy();
      // street field is required
      errors = street.errors || {};
      expect(errors['required']).toBeTruthy();
      street.setValue('polna');
      errors = street.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('postalcode should be valid', () => {
      let errors = {};
      const postalcode = component.summaryForm.controls.postalcode;

      expect(postalcode.valid).toBeFalsy();
      // postalcode field is required
      errors = postalcode.errors || {};
      expect(errors['required']).toBeTruthy();
      postalcode.setValue('polna');
      errors = postalcode.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('city should be valid', () => {
      let errors = {};
      const city = component.summaryForm.controls.city;

      expect(city.valid).toBeFalsy();
      // city field is required
      errors = city.errors || {};
      expect(errors['required']).toBeTruthy();
      city.setValue('polna');
      errors = city.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('phone should be valid', () => {
      let errors = {};
      const phone = component.summaryForm.controls.phone;

      expect(phone.valid).toBeFalsy();
      // phone field is required
      errors = phone.errors || {};
      expect(errors['required']).toBeTruthy();
      phone.setValue('polna');
      errors = phone.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('products should be valid', () => {
      const fb = new FormBuilder();
      const products = <FormArray>(component.summaryForm.controls.products);

      expect(products).toBeTruthy();
      expect(products.controls.length).toBe(2);
      products.push(fb.group({
        id: [product.id, Validators.required],
        type: [product.type, Validators.required],
        price: [product.price, Validators.required]
      }));
      expect(products.controls.length).toBe(3);
    });
    it('should submit form', inject([OrderService, ProductService], (service: OrderService, service2: ProductService) => {
      expect(component.summaryForm.valid).toBeFalsy();
      component.summaryForm.controls.name.setValue('ala');
      component.summaryForm.controls.surname.setValue('ala');
      component.summaryForm.controls.street.setValue('ala');
      component.summaryForm.controls.postalcode.setValue('ala');
      component.summaryForm.controls.city.setValue('ala');
      component.summaryForm.controls.phone.setValue('ala');
      expect(component.summaryForm.valid).toBeTruthy();

      const orderr = new Order();
      orderr.state = OrderStatus.WAITING;
      orderr.products = component.productItems;
      orderr.clientInfo = {
        name: component.summaryForm.get('name').value,
        surname: component.summaryForm.get('surname').value,
        street: component.summaryForm.get('street').value,
        postalCode: component.summaryForm.get('postalcode').value,
        city: component.summaryForm.get('city').value,
        phone: component.summaryForm.get('phone').value
      } as IClientInfo;
      expect(orderr).toEqual(order);
      expect(component.onSubmit).toBeDefined();
      component.onSubmit();
      expect(service.add).toHaveBeenCalled();
      expect(service2.clearCart).toHaveBeenCalled();

    }));
  });

  describe('addProductsToForm', () => {
    it('should be defined', () => {
      expect(component.addProductsToForm).toBeDefined();
    });
    it('should add products to form', () => {
      const fb = new FormBuilder();
      const products = <FormArray>(component.summaryForm.controls.products);

      expect(products).toBeTruthy();
      expect(products.controls.length).toBe(2);
      products.push(fb.group({
        id: [product.id, Validators.required],
        type: [product.type, Validators.required],
        price: [product.price, Validators.required]
      }));
      expect(products.controls.length).toBe(3);
    });
    it('should not add products to form', () => {
      const fb = new FormBuilder();
      const products = <FormArray>(component.summaryForm.controls.products);

      expect(products).toBeTruthy();
      expect(products.controls.length).toBe(2);
      products.push(fb.group({
        id: [product.id, Validators.required],
        type: [product.type, Validators.required],
        price: [product.price, Validators.required]
      }));
      expect(products.controls.length).not.toBe(2);
    });
  });

  describe('getProductsLength', () => {
    it('should be defined', () => {
      expect(component.getProductsLength).toBeDefined();
    });
    it('should return number', () => {
      expect(component.getProductsLength()).toBe(2);
    });
    it('should return number', () => {
      expect(component.getProductsLength()).not.toBe(3);
    });
  });
});
