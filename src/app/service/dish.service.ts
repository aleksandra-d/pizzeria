import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pizza} from '../interface/pizza';
import {Drink} from '../interface/drink';
import {Pasta} from '../interface/pasta';
import {map} from 'rxjs/operators';
import {State} from '../enum/state';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  /**
   * gets available pizzas
   */
  getPizzasForClient(): Observable<Pizza[]> {
    return this
      .http
      .get<Pizza[]>(`${this.url}/pizzas`)
      .pipe(
        map((data: any) => {
          return data.filter((item: Pizza) => item.state !== State.UNAVAILABLE);
        })
      );
  }

  /**
   * gets all pizzas
   */
  getPizzasForOwner(): Observable<Pizza[]> {
    return this
      .http
      .get<Pizza[]>(`${this.url}/pizzas`);
  }

  /**
   * gets all pastas
   */
  getPastasForOwner(): Observable<Pasta[]> {
    return this
      .http
      .get<Pasta[]>(`${this.url}/pastas`);
  }

  /**
   * gets available pastas
   */
  getPastasForClient(): Observable<Pasta[]> {
    return this
      .http
      .get<Pasta[]>(`${this.url}/pastas`).pipe(
        map((data: any) => {
          return data.filter((item: Pasta) => item.state !== State.UNAVAILABLE);
        })
      );
  }

  /**
   * gets pastas by id
   * @param id
   */
  getPastaById(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/pastas/${id}`);
  }

  /**
   * gets drink by id
   * @param id
   */
  getDrinkById(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/drinks/${id}`);
  }

  /**
   * gets piiza by id
   * @param id
   */
  getPizzaById(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/pizzas/${id}`);
  }

  /**
   * gets available drinks
   */
  getDrinksForClient(): Observable<Drink[]> {
    return this
      .http
      .get<Drink[]>(`${this.url}/drinks`).pipe(
        map((data: any) => {
          return data.filter((item: Drink) => item.state !== State.UNAVAILABLE);
        })
      );
  }

  /**
   * gets all drinks
   */
  getDrinksForOwner(): Observable<Drink[]> {
    return this
      .http
      .get<Drink[]>(`${this.url}/drinks`);
  }

  /**
   *
   * @param pizza
   */
  updatePizza (pizza: Pizza): Observable<any> {
    return this.http.put<Pizza>((`${this.url}/pizzas/${pizza.id}`), pizza);
  }

  /**
   *
   * @param pasta
   */
  updatePasta (pasta: Pasta): Observable<any> {
    return this.http.put<Pasta>((`${this.url}/pastas/${pasta.id}`), pasta);
  }

  /**
   *
   * @param drink
   */
  updateDrink (drink: Drink): Observable<any> {
    return this.http.put<Drink>((`${this.url}/drinks/${drink.id}`), drink);
  }
}
