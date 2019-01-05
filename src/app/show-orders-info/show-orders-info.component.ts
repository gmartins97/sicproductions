import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { orderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { order } from '../model/order';
import { Item } from '../model/Item';
import { orderItem } from '../model/orderItem';

@Component({
  selector: 'app-show-orders-info',
  templateUrl: './show-orders-info.component.html',
  styleUrls: ['./show-orders-info.component.css']
})
export class ShowOrdersInfoComponent implements OnInit {

  idroute: number;
  order: order;
  item: Item[];
  product: orderItem;
  cidade: string;
  state: string;
  date: Date;
  totalPrice: number;
  longitude: number;
  latitude: number;

  constructor(private router: Router, private route: ActivatedRoute, private service: orderService , private authservice: AuthService , private bar: MatSnackBar) { }

  ngOnInit() {
    this.getEncomenda(this.authservice.getLoggedInUsername());
  }

  getEncomenda(username : string) {
    let id: number;
    this.route.params.subscribe(res => {
      id = <number>res.id;
    });
    this.idroute = id;
    this.service.getEncomenda(username,id).subscribe(res => {
      this.order = <order>res;
      this.item = this.order.item;
      console.log(this.item);
      this.latitude=this.order.latitude;
      this.longitude=this.order.longitude;
      this.state=this.order.state;
      this.cidade=this.order.cidade;
      this.date=this.order.date;
      this.totalPrice=this.order.totalPrice;

      console.log(this.order);
    }, e => {
      if (e.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Ocorreu um erro ao tentar obter o produto escolhido do servidor...`,
          '', {
            duration: 2000,
          });
      }
    });
  }

  deleteOrder(): void {
    this.service.deleteEncomenda(this.idroute).subscribe(
      p => {
        this.bar.open(`Order removida com sucesso`, '', { duration: 2000 });
        this.router.navigateByUrl('/orders');
      },
      e => {
        this.bar.open('Ocorreu um erro: ' + e.error, '', { duration: 2000 });
      });

  }

  back(): void {
    const username = this.authservice.getLoggedInUsername();
    this.router.navigateByUrl(`/orders/${username}`);
  }


}
