import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../models/Product';
import {Router} from '@angular/router';
import {Order} from '../models/Order';
import {OrderStatus} from '../enum/orderStatus';
import {IClientInfo} from '../interface/IClientInfo';
import {OrderService} from '../service/order.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  productItems: Array<Product> = Array<Product>();

  summaryForm: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) { }

  /**
   * handles form submit
   */
  onSubmit() {
    const order = new Order();
    order.state = OrderStatus.WAITING;
    order.products = this.productItems;
    order.clientInfo = {
      name: this.summaryForm.get('name').value,
      surname: this.summaryForm.get('surname').value,
      street: this.summaryForm.get('street').value,
      postalCode: this.summaryForm.get('postalcode').value,
      city: this.summaryForm.get('city').value,
      phone: this.summaryForm.get('phone').value
    } as IClientInfo;
    this.orderService.add(order).subscribe(newOrder => {
      console.log(newOrder);
      this.router.navigateByUrl('/thankyou');
    });
    this.productService.clearCart();
  }

  ngOnInit() {
    this.productItems = this.productService.getAllProducts();

    this.summaryForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      street: ['', Validators.required],
      postalcode: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      products: this.formBuilder.array([])
    });

    this.addProductsToForm();

    console.log(this.summaryForm);
  }

  /**
   * handles adding products to form
   */
  addProductsToForm(): void {
    this.productItems.forEach(product => {
      (<FormArray>this.summaryForm.get('products'))
        .push(this.formBuilder.group({
        id: [product.id, Validators.required],
        type: [product.type, Validators.required],
        price: [product.price, Validators.required],
        name: [product.name, Validators.required]
      }));
    });
  }

  /**
   * returns length of products
   */
  getProductsLength(): number {
    return this.productItems.length;
  }

  /**
   *
   */
  get formData() {
    return <FormArray>this.summaryForm.get('products');
  }
  /**
   * counts sum of products in cart
   */
  getTotalPrice(): Number {
    return this.productItems
      .map((product: Product) => +product.price)
      .reduce((a, b) => a + b, 0);
  }

}
