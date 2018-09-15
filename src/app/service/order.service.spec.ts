import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [OrderService]
    });
  });

  it('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
