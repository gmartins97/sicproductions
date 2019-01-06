import { Component, OnInit } from '@angular/core';
import { Catalogue } from '../model/catalogue';
import { Router } from "@angular/router";
import { CatalogueService } from "../services/catalogue.service";
import { MatSnackBar } from "@angular/material";


@Component({
  selector: 'app-client-catalogues',
  templateUrl: './client-catalogues.component.html',
  styleUrls: ['./client-catalogues.component.css']
})
export class ClientCataloguesComponent implements OnInit {

  catalogues: Catalogue[] = [];

  constructor(private router: Router, private service: CatalogueService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getCatalogues();
  }

  getCatalogues() {
    this.service.getCatalogues().subscribe(data => {
			let tmp = (<Catalogue[]>data);
      for(let cat of tmp) {
        if(cat.published) {
          this.catalogues.push(cat);
        }
      }
		}, error => {
			if (error.status == 401) {
				this.bar.open(
					'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
					'', {
						duration: 2000,
					});
			} else {
				this.bar.open(
					`Ocorreu um erro ao tentar obter os catálogos do servidor...`,
					'', {
						duration: 2000,
					});
			}
		});
  }

}
