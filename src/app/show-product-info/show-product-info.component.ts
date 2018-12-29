import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Category } from '../model/category';
import { MaterialFinish } from '../model/material-finish';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { Dimension } from '../model/dimension';

@Component({
  selector: 'app-show-product-info',
  templateUrl: './show-product-info.component.html',
  styleUrls: ['./show-product-info.component.css']
})
export class ShowProductInfoComponent implements OnInit {
  idroute: number;
  product: Product;
  name: string;
  category: Category;
  materialfinishes: MaterialFinish[];
  height: Dimension;
  width: Dimension;
  depth: Dimension;
  minOccup: number;
  maxOccup: number;

  constructor(private router: Router, private route: ActivatedRoute, private service: ProductService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    let id: number;
    this.route.params.subscribe(res => {
      id = <number>res.id;
    });
    this.idroute = id;
    this.service.getProduct(id).subscribe(res => {
      this.product = res;
      this.name = res.name;
      this.category = res.category;
      this.materialfinishes = res.materialFinishes;
      this.height = res.dimensions.height;
      this.width = res.dimensions.width;
      this.depth = res.dimensions.depth;
      this.minOccup = res.minOccupancyPercentage;
      this.maxOccup = res.maxOccupancyPercentage;
    }, e => {
      this.bar.open(e.error, '', { duration: 2000 });
    });
  }

  editProduct(): void {
    this.router.navigateByUrl('/products/edit/' + this.idroute);
  }

  deleteProduct(): void {
    this.service.deleteProduct(this.idroute).subscribe(
      p => {
        this.bar.open(`Produto ${p.name} removido com sucesso`, '', { duration: 2000 });
        this.router.navigateByUrl('/products');
      },
      e => {
        this.bar.open('Ocorreu um erro: ' + e.error, '', { duration: 2000 });
      });

  }

  back(): void {
    this.router.navigateByUrl('/products');
  }


}
