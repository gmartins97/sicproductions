import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Category } from '../model/category';
import { MaterialFinish } from '../model/material-finish';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { Dimension } from '../model/dimension';
import { DiscreteDimension } from '../model/discrete-dimension';
import { ContinuousDimension } from '../model/continuous-dimension';
import { CategoryService } from '../services/category.service';
import { SelectMaterialFinishesDialog } from '../create-product/select-material-finish-dialog';
import { SelectPartsDialog } from '../create-product/select-parts-dialog';
import { OptionalProducts } from '../model/optional-products';
import { Part } from '../show-product-info/show-product-info.component';

const min_array_limit: number = 1;
const dim_min_limit: number = 1;
const percentage_min_limit: number = 0;
const max_limit: number = 100;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product;
  name: string;
  category: Category;
  categoryBefore: string;
  categories: Category[];
  materialfinishes: MaterialFinish[];

  height_min: number;
  height_max: number;
  height_disc: string;

  width_min: number;
  width_max: number;
  width_disc: string;

  depth_min: number;
  depth_max: number;
  depth_disc: string;

  height_min_ant: number;
  height_max_ant: number;
  height_disc_ant: string;

  width_min_ant: number;
  width_max_ant: number;
  width_disc_ant: string;

  depth_min_ant: number;
  depth_max_ant: number;
  depth_disc_ant: string;

  optionalProducts: OptionalProducts[] = [];
  parts: Part[] = [];
  partsBefore: Part[] = [];

  minOccup: number;
  maxOccup: number;

  discretePattern: string = "[0-9]+([;][0-9]+)*";
  
  constructor(private router: Router, private route: ActivatedRoute, private service: ProductService, private catService: CategoryService, public dialog: MatDialog, private bar: MatSnackBar) { }

  ngOnInit() {
    this.getCategories();
    this.getProduct();
    
  }

  getProduct() {
    let id: number;
    this.route.params.subscribe(res => {
      id = <number>res.id;
    });
    this.service.getProduct(id).subscribe(res => {
      this.product = <Product>res;
      console.log(this.product);
      this.name = this.product.name;
      this.categoryBefore = (<Category>this.product.category).description;
      this.materialfinishes = this.product.materialFinishes;
      let optproducts: OptionalProducts[] = this.product.optionalProducts;
      if (!optproducts === undefined) {
        this.convertPartsBefore(optproducts);
      }
      
      let heightDisc_ant = (<DiscreteDimension>this.product.dimensions.height);
      if (heightDisc_ant.discrete == null) {
        this.height_max_ant = (<ContinuousDimension>this.product.dimensions.height).max;
        this.height_min_ant = (<ContinuousDimension>this.product.dimensions.height).min;
      } else {
        this.height_disc_ant = (<DiscreteDimension>this.product.dimensions.height).discrete;
      }

      let widthDisc_ant = (<DiscreteDimension>this.product.dimensions.width);
      if (widthDisc_ant.discrete == null) {
        this.width_max_ant = (<ContinuousDimension>this.product.dimensions.width).max;
        this.width_min_ant = (<ContinuousDimension>this.product.dimensions.width).min;
      } else {
        this.width_disc_ant = (<DiscreteDimension>this.product.dimensions.width).discrete;
      }

      let depthDisc_ant = (<DiscreteDimension>this.product.dimensions.depth);
      if (depthDisc_ant.discrete == null) {
        this.depth_max_ant = (<ContinuousDimension>this.product.dimensions.depth).max;
        this.depth_min_ant = (<ContinuousDimension>this.product.dimensions.depth).min;
      } else {
        this.depth_disc_ant = (<DiscreteDimension>this.product.dimensions.depth).discrete;
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

  convertPartsBefore(optionalProducts: OptionalProducts[]) {
    let product: Product;
    for (let i = 0; i < optionalProducts.length; i++) {
      this.service.getProduct(optionalProducts[i].productId).subscribe(res => {
        product = <Product>res;
        let opt: string = this.writeOptionalOrMandatory(optionalProducts[i].optional);
        let p: Part = { product: product, optional: opt };
        this.partsBefore.push(p);
      });
    }
  }

  private writeOptionalOrMandatory(isOptional: boolean): string {
    if (isOptional === true) {
      return "Opcional";
    }
    return "Obrigatório";
  }

  removeFromMaterialList(materialfinish: MaterialFinish): void {
    console.log(materialfinish);
    let index: number = this.materialfinishes.findIndex(mat => (mat.id == materialfinish.id));
    this.materialfinishes.splice(index, 1);
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

  chooseMaterialFinishes() {
    this.openMaterialDialog();
  }

  chooseParts() {
    this.openPartsDialog();
  }

  openMaterialDialog(): void {
    const dialogRef = this.dialog.open(SelectMaterialFinishesDialog, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.materialfinishes = result;
    });
  }

  openPartsDialog(): void {
    const dialogRef = this.dialog.open(SelectPartsDialog, {
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.optionalProducts = result;

      if (!result === undefined) {
        this.convertToParts(result);
      }
    });
  }

  convertToParts(optionalProducts: OptionalProducts[]) {
    let product: Product;
    for (let i = 0; i < optionalProducts.length; i++) {
      this.service.getProduct(optionalProducts[i].productId).subscribe(res => {
        product = <Product>res;
        let opt: string = this.writeOptionalOrMandatory(optionalProducts[i].optional);
        let p: Part = { product: product, optional: opt };
        this.parts.push(p);
      });
    }
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

  //--------- FOR HTML SHOW/HIDE 
  // ALTURA
  showDivNewAltura() {
    document.getElementById('newAltura').style.display = "block";
  }

  dispose_showDivNewAltura() {
    document.getElementById('newAltura').style.display = "none";
  }

  showDivNewAlturaDiscreta() {
    this.dispose_showDivNewAlturaContinua();
    this.height_min = null;
    this.height_max = null;
    document.getElementById('newAlturaDiscreta').style.display = "block";
  }

  dispose_showDivNewAlturaDiscreta() {
    document.getElementById('newAlturaDiscreta').style.display = "none";
  }

  showDivNewAlturaContinua() {
    this.dispose_showDivNewAlturaDiscreta();
    this.height_disc = null;
    document.getElementById('newAlturaContinua').style.display = "block";
  }

  dispose_showDivNewAlturaContinua() {
    document.getElementById('newAlturaContinua').style.display = "none";
  }

  //LARGURA
  showDivNewLargura() {
    this.dispose_showDivNewLargura();
    document.getElementById('newLargura').style.display = "block";
  }

  dispose_showDivNewLargura() {
    document.getElementById('newLargura').style.display = "none";
  }

  showDivNewLarguraDiscreta() {
    this.dispose_showDivNewLarguraContinua();
    this.width_max = null;
    this.width_min = null;
    document.getElementById('newLarguraDiscreta').style.display = "block";
  }

  dispose_showDivNewLarguraDiscreta() {
    document.getElementById('newLarguraDiscreta').style.display = "none";
  }

  showDivNewLarguraContinua() {
    this.dispose_showDivNewLarguraDiscreta();
    this.width_disc = "";
    document.getElementById('newLarguraContinua').style.display = "block";
  }

  dispose_showDivNewLarguraContinua() {
    document.getElementById('newLarguraContinua').style.display = "none";
  }

  // PROFUNDIDADE
  showDivNewProfundidade() {
    document.getElementById('newProfundidade').style.display = "block";
  }

  dispose_showDivNewProfundidade() {
    document.getElementById('newProfundidade').style.display = "none";
  }

  showDivNewProfundidadeDiscreta() {
    this.dispose_showDivNewProfundidadeContinua();
    this.depth_min = null;
    this.depth_max = null;
    document.getElementById('newProfundidadeDiscreta').style.display = "block";
  }

  dispose_showDivNewProfundidadeDiscreta() {
    document.getElementById('newProfundidadeDiscreta').style.display = "none";
  }

  showDivNewProfundidadeContinua() {
    this.dispose_showDivNewProfundidadeDiscreta();
    this.depth_disc = "";
    document.getElementById('newProfundidadeContinua').style.display = "block";
  }

  dispose_showDivNewProfundidadeContinua() {
    document.getElementById('newProfundidadeContinua').style.display = "none";
  }

}
