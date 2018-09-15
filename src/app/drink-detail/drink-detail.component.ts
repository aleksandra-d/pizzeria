import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Drink} from '../interface/drink';
import {ActivatedRoute} from '@angular/router';
import {DishService} from '../service/dish.service';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  @Input() drink: Drink;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.getDrink();
  }
  getDrink(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dishService.getDrink(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(drink => this.drink = drink);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.dishService.updateDrink(this.drink)
      .subscribe(() => this.goBack());
  }

}
