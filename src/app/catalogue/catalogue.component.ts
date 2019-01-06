import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';
import { Catalogue } from '../model/catalogue';
import { Product } from '../model/product';

export class CataloguePrimitive {
  id?: number;
  name: string;
  year: number;
  published: string;
  csscolor: string;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  displayedColumns = ['position', 'name', 'year', 'published', /*'products',*/ 'dopublish', 'edit', 'remove'];
  dataSource: MatTableDataSource<CataloguePrimitive>;
  catalogues: Catalogue[];
  products: Product[];
  realcatalogue: Catalogue[] = [];
  cataloguesPrimitive: CataloguePrimitive[] = [];
  constructor(private router: Router, private service: CatalogueService, private bar: MatSnackBar) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getCatalogues();
    
  }

  getCatalogues(): void {
    this.cataloguesPrimitive = [];
    this.catalogues = [];
    this.realcatalogue = [];
    this.service.getCatalogues().subscribe(data => {
      this.catalogues = <Catalogue[]>data;
      for (let cat of this.catalogues) {
        if (cat.type == 0) {
          let pub: string;
          let css: string;
          cat.published == true ? pub = "check_circle" : pub = "cancel";
          cat.published == true ? css = "green" : css = "black";

          let catp: CataloguePrimitive = { id: cat.id, name: cat.name, year: cat.year, published: pub, csscolor: css };
          this.cataloguesPrimitive.push(catp);
          this.realcatalogue.push(cat);
        }
      }
      this.dataSource = new MatTableDataSource(this.cataloguesPrimitive);
    }, error => {
      if (error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          'Ocorreu um erro ao tentar obter os catálogos do servidor...',
          '', {
            duration: 2000,
          });
      }
      });
  }

  addCatalogue(): void {
    this.router.navigateByUrl("catalogues/new");
  }

  publishCatalogue(index: number): void {
    let id: number = this.realcatalogue[index].id;
    let catalogue: Catalogue;
    let catToPublish: Catalogue;
    this.service.getCatalogue(id).subscribe(res => {
      catalogue = <Catalogue>res;
      if (catalogue.published == true) {
        catToPublish = new Catalogue(catalogue.name, catalogue.year, catalogue.type, false, catalogue.products, catalogue.id);
      } else {
        catToPublish = new Catalogue(catalogue.name, catalogue.year, catalogue.type, true, catalogue.products, catalogue.id);
      }
      
      this.service.updateCatalogue(id, catToPublish).subscribe(res => {
        this.bar.open('Sucesso, o catálogo foi publicado.', '', { duration: 2000 });
        this.refresh();
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
    });
  }

  getProductOfCatalogue(index: number) {
    this.products = [];
    let id: number = this.realcatalogue[index].id;
    let catalogue: Catalogue;
    this.service.getCatalogue(id).subscribe(res => {
      catalogue = <Catalogue>res;
      console.log(catalogue.products);
      this.products = catalogue.products;
    });
  }

  editCatalogue(index: number): void {
    let id = this.realcatalogue[index].id;
    this.router.navigateByUrl("catalogues/edit/" + id);

  }

  deleteCatalogue(index: number) {
    let id = this.realcatalogue[index].id;
    
    this.service.deleteCatalogue(id).subscribe(cat => {
      this.bar.open(
        `Sucesso: o catálogo foi eliminado.`,
        '', {
          duration: 2000,
        });
      this.refresh();
    }, error => {
      if (error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Ocorreu um erro ao tentar eliminar o catálogo: ${error.error}`,
          '', {
            duration: 2000,
          });
      }
    });
  }

  refresh() {
    this.getCatalogues();
  }
}
