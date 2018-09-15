import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Pasta} from '../interface/pasta';
import {ActivatedRoute} from '@angular/router';
import {DishService} from '../service/dish.service';
import {Location} from '@angular/common';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-pasta-detail',
  templateUrl: './pasta-detail.component.html',
  styleUrls: ['./pasta-detail.component.scss']
})
export class PastaDetailComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  @Input() pasta: Pasta;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPasta();
  }

  /**
   * gets pasta
   */
  getPasta(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dishService.getPastaById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(pasta => this.pasta = pasta);
  }

  /**
   * leads to previous location
   */
  goBack(): void {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * saves pasta
   */
  save(): void {
    this.dishService.updatePasta(this.pasta)
      .subscribe(() => this.goBack());
  }

}
