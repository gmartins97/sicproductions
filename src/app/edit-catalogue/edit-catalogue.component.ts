import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CatalogueService } from '../services/catalogue.service';
import { ProductService } from '../services/product.service';
import { Catalogue } from '../model/catalogue';

@Component({
  selector: 'app-edit-catalogue',
  templateUrl: './edit-catalogue.component.html',
  styleUrls: ['./edit-catalogue.component.css']
})
export class EditCatalogueComponent implements OnInit {

  catalogue: Catalogue;

  name: string;
  products: Product[];
  chosenProducts: Product[] = [];
  productsForm = new FormControl();
  year: number;
  type: number = 0;
  published: boolean = false;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private bar: MatSnackBar, private service: CatalogueService, private prodService: ProductService) { }

  ngOnInit() {
    this.getProducts();
    this.getCatalogue();
  }

  private getCatalogue(): void {
    this.route.params.subscribe(res => {
      this.id = <number>res.id;
    });
    this.service.getCatalogue(this.id).subscribe(res => {
      this.catalogue = <Catalogue>res;
      this.name = this.catalogue.name;
      this.year = this.catalogue.year;
      this.published = this.catalogue.published;
      this.updateChosenProducts(<Product[]>this.catalogue.products);
    });
  }

  private updateChosenProducts(products: Product[]) {
    let ids: number[] = [];
    for (let p of products) {
      ids.push(p.id);
    }
    console.log(ids);
    for (let p of this.products) {
      for (let i of ids) {
        if (p.id == i) {
          this.chosenProducts.push(p);
        }
      }
    }
    this.productsForm.setValue(this.chosenProducts);
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
        `Nome do catálogo não pode estar vazio.`,
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

    let catalogue = new Catalogue(this.name, this.year, this.type, this.published, this.chosenProducts);
    console.log('request vai ser:')
    console.log(catalogue)
    this.service.updateCatalogue(this.id, catalogue).subscribe(res => {
      this.bar.open('Sucesso, o catálogo foi atualizado.', '', { duration: 2000 });
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
