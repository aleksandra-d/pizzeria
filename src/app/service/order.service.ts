import { Injectable } from '@angular/core';
import {Order} from '../models/Order';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  /**
   *
   * @param order
   */
  add(order: Order): Observable<Order> {
    return this.http.post<Order>(
      this.url, order
    );
  }

  /**
   * gets all orders
   */
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url)
      .pipe(
        catchError(this.handleError('getAll', []))
      );
  }

  /**
   *gets order by id
   * @param id
   */
  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${id}`);
  }

  /**
   * handles Http operation that failed
   * let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
