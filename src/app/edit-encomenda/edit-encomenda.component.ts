import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { orderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { order } from '../model/order';
import { Item } from '../model/Item';
import { orderItem } from '../model/orderItem';

@Component({
  selector: 'app-edit-encomenda',
  templateUrl: './edit-encomenda.component.html',
  styleUrls: ['./edit-encomenda.component.css']
})
export class EditEncomendaComponent implements OnInit {

  idroute: number;
  order: order;
  cidade: string;
  longitude: number;
  latitude: number;
  item: Item[];
  product: orderItem;
  parts: orderItem[];
  part: orderItem;
  state: string;
  date: Date;
  totalPrice: number;

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
      this.latitude=this.order.latitude;
      this.longitude=this.order.longitude;
      this.cidade=this.order.cidade;
      this.order = <order>res;
      this.item = this.order.item;
      this.parts= this.order.item[0].product.listProduct;
      this.state=this.order.state;
      this.date=this.order.date;
      this.totalPrice=this.order.totalPrice;

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

  confirm(): void {
    this.order.cidade=this.cidade;
    this.order.latitude=this.latitude;
    this.order.longitude=this.longitude;
    this.service.updateEncomenda(this.idroute, this.order).subscribe(order => {
      this.bar.open(
        `Sucesso: a encomenda foi editada com sucesso.`,
        '', {
          duration: 2000,
        });
      this.back();
    }, error => {
      if (error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Erro: ${error.error}`,
          '', {
            duration: 2000,
          });
      }
    });

  }

  back(): void {
    const username = this.authservice.getLoggedInUsername();
    this.router.navigateByUrl(`/orders/${username}`);
  }


}
