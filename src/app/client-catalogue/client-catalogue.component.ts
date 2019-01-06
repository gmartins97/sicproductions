import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Catalogue } from '../model/catalogue';
import { ActivatedRoute, Router } from "@angular/router";
import { CatalogueService } from "../services/catalogue.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-client-catalogue',
  templateUrl: './client-catalogue.component.html',
  styleUrls: ['./client-catalogue.component.css']
})
export class ClientCatalogueComponent implements OnInit {

  collection: string = "Coleção Teste";

  catalogue: Catalogue;
  products: Product[];
  id: number;

  getProducts() {
    this.route.params.subscribe(res => {
      this.id = <number>res.id;
    });
    this.service.getCatalogue(this.id).subscribe(data => {
      this.catalogue
      = (<Catalogue>data);
      console.log(this.catalogue.products);
      this.products = this.catalogue.products;
    }, error => {
      if (error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Ocorreu um erro ao tentar obter o catalogo do servidor...`,
          '', {
            duration: 2000,
          });
      }
    });
  }

  constructor(private route: ActivatedRoute, private router: Router, private service: CatalogueService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getProducts();
  }

  random() : number {
    return Math.random();
  }
}
