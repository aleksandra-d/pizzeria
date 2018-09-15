import { Component, OnInit } from '@angular/core';
import { Pizza } from '../interface/pizza';
import { DishService} from '../service/dish.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pizzas: Pizza[];

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this
      .dishService
      .getPizzasForClient()
      .subscribe((data: Pizza[]) =>
        this.pizzas = data.slice(1, 5));
  }

}
