import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  baseUrl = `${environment.apiUrl}/Order`;

  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  public postOrder(inputOrder: string): Observable<Order>{
    return this.http.post<Order>(`${this.baseUrl}`, {
      detail: inputOrder
    });
  }

  public deleteAllOrders(): Observable<Order> {
    return this.http.delete<Order>(`${this.baseUrl}`);
  }

}
