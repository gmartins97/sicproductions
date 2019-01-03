import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Category } from '../model/category';
import { MaterialFinish } from '../model/material-finish';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { Dimension } from '../model/dimension';
import { DiscreteDimension } from '../model/discrete-dimension';
import { ContinuousDimension } from '../model/continuous-dimension';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product;
  name: string;
  category: Category;
  categories: Category[];
  materialfinishes: MaterialFinish[];

  height_min: number;
  height_max: number;
  height_disc: number[];

  width_min: number;
  width_max: number;
  width_disc: number[];

  depth_min: number;
  depth_max: number;
  depth_disc: number[];

  minOccup: number;
  maxOccup: number;

  constructor(private router: Router, private route: ActivatedRoute, private service: ProductService, private catService: CategoryService, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getProduct();
    this.getCategories();
  }

  getProduct() {
    let id: number;
    this.route.params.subscribe(res => {
      id = <number>res.id;
    });
    this.service.getProduct(id).subscribe(res => {
      this.product = <Product>res;
      this.name = this.product.name;
      this.category = <Category> this.product.category;
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

  getCategories(): void {
    this.catService.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter as categorias do servidor...`,
        '', {
          duration: 2000,
        });
    });
  }

  confirm(): void {
    //const sizeSurfaceFinishName = this.surfaceFinishName.trim().length;

    //if (sizeSurfaceFinishName > 0) {
    //  this.surface.name = this.surfaceFinishName;
    //  this.service.updateSurfaceFinish(this.surface).subscribe(res => {
    //    this.bar.open('Sucesso: o acabamento foi atualizado', '', { duration: 2000 });
    //    this.back();
    //  }, e => {
    //    this.bar.open(e.error, '', { duration: 2000 });
    //  });
    //} else {
    //  this.minLengthValidation = false;
    //}
    this.bar.open(`Tem calma que isto ainda não está implementado.`, '', { duration: 2000 });
  }

  back(): void {
    this.router.navigateByUrl('/products');
  }

}
