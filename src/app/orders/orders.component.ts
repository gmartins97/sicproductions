import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { order } from '../model/order';
import {MatTableDataSource, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name' , 'date', 'info', 'edit', 'remove'];
  orders: order[];
  dataSource: MatTableDataSource<order>;

  constructor(private router: Router, private service: orderService , private bar: MatSnackBar, private authservice: AuthService) { }

  ngOnInit() {
    this.getEncomendas(this.authservice.getLoggedInUsername());
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEncomendas(username : string) {
    this.service.getEncomendasUser(username).subscribe(data => {
      this.orders = <order[]>data;
      this.dataSource = new MatTableDataSource(this.orders);
    }, error => {
      if(error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          'Ocorreu um erro ao tentar obter as encomendas do servidor...',
          '', {
            duration: 2000,
          });
      }
    });
  }


 /* editOrder(index: number): void {
    let id = this.orders[index].id;
    this.router.navigateByUrl("orders/edit/" + id);
 } */

  showOrder(index: number) {
    let id = this.orders[index]._id;
    this.router.navigateByUrl("orders/show/" + id);
  }

  deleteOrder(index: number): void {
    this.service.deleteEncomenda(this.orders[index]._id).subscribe(
      p => {
        this.bar.open(`Encomenda removido com sucesso`, '', { duration: 2000 });
        this.getEncomendas(this.authservice.getLoggedInUsername());
      },
      e => {
        this.bar.open('Ocorreu um erro: ' + e.error, '', { duration: 2000 });
      });
  }

}
