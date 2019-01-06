import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';
import { Catalogue } from '../model/catalogue';
import { CataloguePrimitive } from '../catalogue/catalogue.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  displayedColumns = ['position', 'name', 'year', 'published', /*'products', */'dopublish', 'edit', 'remove'];
  dataSource: MatTableDataSource<CataloguePrimitive>;
  collections: Catalogue[];
  realcollection: Catalogue[] = [];
  collectionsPrimitive: CataloguePrimitive[] = [];
  constructor(private router: Router, private service: CatalogueService, private bar: MatSnackBar) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getCollections();

  }

  getCollections(): void {
    this.collectionsPrimitive = [];
    this.collections = [];
    this.realcollection = [];
    this.service.getCatalogues().subscribe(data => {
      this.collections = <Catalogue[]>data;
      for (let col of this.collections) {
        if (col.type == 1) {
          let pub: string;
          let css: string;
          col.published == true ? pub = "check_circle" : pub = "cancel";
          col.published == true ? css = "green" : css = "black";

          let colp: CataloguePrimitive = { id: col.id, name: col.name, year: col.year, published: pub, csscolor: css };
          this.collectionsPrimitive.push(colp);
          this.realcollection.push(col);
        }
      }
      this.dataSource = new MatTableDataSource(this.collectionsPrimitive);
    }, error => {
      if (error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          'Ocorreu um erro ao tentar obter as coleções do servidor...',
          '', {
            duration: 2000,
          });
      }
    });
  }

  addCollection(): void {
    this.router.navigateByUrl("collections/new");
  }

  publishCollection(index: number): void {
    let id: number = this.realcollection[index].id;
    let collection: Catalogue;
    let colToPublish: Catalogue;
    this.service.getCatalogue(id).subscribe(res => {
      collection = <Catalogue>res;
      if (collection.published == true) {
        colToPublish = new Catalogue(collection.name, collection.year, collection.type, false, collection.products, collection.id);
      } else {
        colToPublish = new Catalogue(collection.name, collection.year, collection.type, true, collection.products, collection.id);
      }

      this.service.updateCatalogue(id, colToPublish).subscribe(res => {
        if (collection.published) {
          this.bar.open('Sucesso, a coleção foi retirada.', '', { duration: 2000 });
        } else {
          this.bar.open('Sucesso, a coleção foi publicada.', '', { duration: 2000 });
        }
        
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

  editCollection(index: number): void {
    let id = this.realcollection[index].id;
    this.router.navigateByUrl("collections/edit/" + id);

  }

  deleteCollection(index: number) {
    let id = this.realcollection[index].id;
    this.service.deleteCatalogue(id).subscribe(cat => {
      this.bar.open(
        `Sucesso: a coleção foi eliminada.`,
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
          `Ocorreu um erro ao tentar eliminar a coleção: ${error.error}`,
          '', {
            duration: 2000,
          });
      }
    });
  }

  refresh() {
    this.getCollections();
  }
}

