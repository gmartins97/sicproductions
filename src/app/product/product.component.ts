import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatSnackBar} from "@angular/material";
import {Category} from "../model/category";
import { MaterialFinish } from "../model/material-finish";
import {Material} from "../model/Material";
import {SurfaceFinish} from "../model/surface-finish";
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { Dimension } from '../model/dimension';
import { Dimensions } from '../model/dimensions';

/* para apagar */
const name1 = "Armário XPTO";
const name2 = "Armário XYZ";
const category1 = new Category("Armário", 0);
const mat1 = new Material("Madeira", 3.89);
const finish1 = new SurfaceFinish("Serrado");
const increment1 = 3.11;
//const texture1 = "https://www.sharecg.com/images/medium/24765.jpg";
const materialFinishes1 = [{material: mat1, surface: finish1, price: increment1}];
const dim1 : Dimension = {min: 150, max: 300};
const dimensions1 : Dimensions = {width: dim1, height: dim1, depth: dim1};
const minOccupancyPercentage1 = 0;
const maxOccupancyPercentage1 = 100;
const prod1 : Product = {name: name1, category: category1, materialFinishes: materialFinishes1, dimensions: dimensions1, parts: [], minOccupancyPercentage: minOccupancyPercentage1, maxOccupancyPercentage: maxOccupancyPercentage1};
const prod2 : Product = {name: name2, category: category1, materialFinishes: materialFinishes1, dimensions: dimensions1, parts: [], minOccupancyPercentage: minOccupancyPercentage1, maxOccupancyPercentage: maxOccupancyPercentage1};


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'info', 'edit', 'remove'];
  products: Product[];
  dataSource: MatTableDataSource<Product>;

  constructor(private router: Router, private service: ProductService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getProducts();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts() {
    this.service.getProducts().subscribe(data => {
      let temp: Product[] = <Product[]>data;
     
      if (temp.length == 0) {
        /* apagar isto quando o get estiver a funcionar */
        this.products = [prod1, prod2];
      } else {
        this.products = <Product[]>data;
      }
      
      this.dataSource = new MatTableDataSource(this.products);
    }, error => {
      if(error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          'Ocorreu um erro ao tentar obter os produtos do servidor...',
          '', {
            duration: 2000,
          });
      }
    });
  }

  addProduct() {
    this.router.navigateByUrl('/products/new');
  }

  editProduct(index: number): void {
    let id = this.products[index].id;
    this.router.navigateByUrl("products/edit/" + id);
  }

  showProduct(index: number) {
    let id = this.products[index].id;
    this.router.navigateByUrl("products/show/" + id);
  }

  deleteProduct(index: number): void {
    this.service.deleteProduct(this.products[index].id).subscribe(
      p => {
        this.bar.open(`Produto ${p.name} removido com sucesso`, '', { duration: 2000 });
        this.getProducts();
      },
      e => {
        this.bar.open('Ocorreu um erro: ' + e.error, '', { duration: 2000 });
      });
  }

}
