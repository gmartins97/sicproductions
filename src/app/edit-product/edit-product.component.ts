import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Category } from '../model/category';
import { MaterialFinish } from '../model/material-finish';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { Dimension } from '../model/dimension';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

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
