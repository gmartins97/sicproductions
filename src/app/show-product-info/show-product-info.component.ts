import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Category } from '../model/category';
import { MaterialFinish } from '../model/material-finish';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { Dimension } from '../model/dimension';
import { ContinuousDimension } from '../model/continuous-dimension';
import { DiscreteDimension } from '../model/discrete-dimension';

@Component({
  selector: 'app-show-product-info',
  templateUrl: './show-product-info.component.html',
  styleUrls: ['./show-product-info.component.css']
})
export class ShowProductInfoComponent implements OnInit {
  idroute: number;
  product: Product;
  name: string;
  categoryName: string;
  materialfinishes: MaterialFinish[];

  height: Dimension;
  height_min: number;
  height_max: number;
  height_disc: number[];

  width: Dimension;
  width_min: number;
  width_max: number;
  width_disc: number[];

  depth: Dimension;
  depth_min: number;
  depth_max: number;
  depth_disc: number[];

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
      this.product = <Product>res;
      this.name = this.product.name;
      this.categoryName = this.product.category.description;
      this.materialfinishes = this.product.materialFinishes;

      let heightDisc = (<DiscreteDimension>this.product.dimensions.height);
      if (heightDisc.discrete == null) {   
        this.height_max = (<ContinuousDimension>this.product.dimensions.height).max;
        this.height_min = (<ContinuousDimension>this.product.dimensions.height).min;
      } else {
        //this.height_disc = (<DiscreteDimension>this.product.dimensions.height).discrete;
      }

      let widthDisc = (<DiscreteDimension>this.product.dimensions.width);
      if (widthDisc.discrete == null) {
        this.width_max = (<ContinuousDimension>this.product.dimensions.width).max;
        this.width_min = (<ContinuousDimension>this.product.dimensions.width).min;
      } else {
        //this.width_disc = (<DiscreteDimension>this.product.dimensions.width).discrete;
      }

      let depthDisc = (<DiscreteDimension>this.product.dimensions.depth);
      if (depthDisc.discrete == null) {
        this.depth_max = (<ContinuousDimension>this.product.dimensions.depth).max;
        this.depth_min = (<ContinuousDimension>this.product.dimensions.depth).min;
      } else {
        //this.depth_disc = (<DiscreteDimension>this.product.dimensions.depth).discrete;
      }

      this.minOccup = this.product.minOccupancyPercentage;
      this.maxOccup = this.product.maxOccupancyPercentage;
    }, e => {
      if (e.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Ocorreu um erro ao tentar obter o produto escolhido do servidor...`,
          '', {
            duration: 2000,
          });
      }
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
