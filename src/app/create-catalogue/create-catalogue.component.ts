import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDatepicker, MatDatepickerInputEvent, MAT_DATE_LOCALE } from '@angular/material';
import { CatalogueService } from '../services/catalogue.service';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { Catalogue } from '../model/catalogue';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-catalogue',
  templateUrl: './create-catalogue.component.html',
  styleUrls: ['./create-catalogue.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },
  ],
})
export class CreateCatalogueComponent implements OnInit {

  name: string = "";
  products: Product[];
  chosenProducts: Product[];
  productsForm = new FormControl();
  year: number = (new Date()).getFullYear();
  type: number = 0;
  published: boolean = false;

  date = new FormControl(new Date());

  constructor(private router: Router, private bar: MatSnackBar, private service: CatalogueService, private prodService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this.prodService.getProducts().subscribe(data => {
      this.products = <Product[]>data;
      console.log(this.products);
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
    console.log(this.chosenProducts);
  }

  removeFromChosenProductsList(product: Product): void {
    let index: number = this.chosenProducts.findIndex(p => (p.id == product.id));
    this.chosenProducts.splice(index, 1);
    this.productsForm.setValue(this.chosenProducts);
  }

  // ONLY FOR DATEPICKER PURPOSE
  //selectYear(event: MatDatepickerInputEvent<Date>) {
  //  this.year = event.value.getFullYear();
  //}

  confirm(): void {
    if (this.name == null || this.name.trim().length == 0) {
      this.bar.open(
        `Nome do catálogo não pode estar vazio.`,
        '', {
          duration: 2000,
        });
      return;
    }

    if (this.year == null ) {
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

    let catalogue = new Catalogue(this.name, this.year, this.type, this.published, this.chosenProducts);
    console.log('request vai ser:')
    console.log(catalogue)
    this.service.createCatalogue(catalogue).subscribe(res => {
      this.bar.open('Sucesso, o catálogo foi criado.', '', { duration: 2000 });
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
    this.router.navigateByUrl('/catalogues');
  }

}
