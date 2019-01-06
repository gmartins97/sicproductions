import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CatalogueService } from '../services/catalogue.service';
import { ProductService } from '../services/product.service';
import { Catalogue } from '../model/catalogue';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  name: string = "";
  products: Product[];
  chosenProducts: Product[];
  productsForm = new FormControl();
  year: number = (new Date()).getFullYear();
  type: number = 1;
  published: boolean = false;

  date = new FormControl(new Date());

  constructor(private router: Router, private bar: MatSnackBar, private service: CatalogueService, private prodService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this.prodService.getProducts().subscribe(data => {
      this.products = <Product[]>data;
    }, error => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter os produtos do servidor: ${error.error}`,
        '', {
          duration: 2000,
        });
    });
  }

  updateProductCards() {
    this.chosenProducts = <Product[]>this.productsForm.value;
  }

  removeFromChosenProductsList(product: Product): void {
    let index: number = this.chosenProducts.findIndex(p => (p.id == product.id));
    this.chosenProducts.splice(index, 1);
    this.productsForm.setValue(this.chosenProducts);
  }

  confirm(): void {
    if (this.name == null || this.name.trim().length == 0) {
      this.bar.open(
        `Nome da coleção não pode estar vazio.`,
        '', {
          duration: 2000,
        });
      return;
    }

    if (this.year == null) {
      this.bar.open(
        `Ano não pode estar vazio.`,
        '', {
          duration: 2000,
        });
      return;
    }

    if (this.year.toString().trim().length != 4) {
      this.bar.open(
        `Ano deve ter 4 algarismos.`,
        '', {
          duration: 2000,
        });
      return;
    }

    let collection = new Catalogue(this.name, this.year, this.type, this.published, this.chosenProducts);
    this.service.createCatalogue(collection).subscribe(res => {
      this.bar.open('Sucesso, a coleção foi criada.', '', { duration: 2000 });
      this.back();
    }, e => {
      if (e.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Erro: ${e.error}`,
          '', {
            duration: 2000,
          });
      }
    });
  }

  back(): void {
    this.router.navigateByUrl('/collections');
  }


}
