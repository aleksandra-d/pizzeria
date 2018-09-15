import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import {RouterTestingModule} from '@angular/router/testing';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [AdminGuard]
    });
  });

  it('should be true', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
