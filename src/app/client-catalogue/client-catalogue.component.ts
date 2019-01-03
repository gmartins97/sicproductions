import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Router } from "@angular/router";
import { ProductService } from "../services/product.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-client-catalogue',
  templateUrl: './client-catalogue.component.html',
  styleUrls: ['./client-catalogue.component.css']
})
export class ClientCatalogueComponent implements OnInit {

  collection: string = "Coleção Teste";


  products: Product[];

  getProducts() {
    this.service.getProducts().subscribe(data => {
			this.products = (<Product[]>data);
		}, error => {
			if (error.status == 401) {
				this.bar.open(
					'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
					'', {
						duration: 2000,
					});
			} else {
				this.bar.open(
					`Ocorreu um erro ao tentar obter os produtos do servidor...`,
					'', {
						duration: 2000,
					});
			}
		});
  }

  constructor(private router: Router, private service: ProductService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getProducts();
  }

  random() : number {
    return Math.random();
  }
}
