import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})

export class OrdersComponent implements OnInit {
  public orders!: Order[];
  @ViewChild('clearInput') clearInput : any;
  inputTextOrder!: string;
  alert: boolean = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (erro: any) => {
        console.error("ERRO getOrder(): " + erro);
      }
    );
  }

  postOrder(){
    this.orderService.postOrder(this.inputTextOrder).subscribe(
      (order: Order) => {
        this.orders.push(order);
      });
    this.clearInput.nativeElement.value = '';
    this.inputTextOrder = '';
  }

  deleteAllOrders(){
    if(confirm("Are you sure to delete all orders?")) {
      this.orderService.deleteAllOrders().subscribe();
      this.orders = [];
      this.alert = true;
    }
  }

  closeAlert(){
    this.alert = false;
  }

}
