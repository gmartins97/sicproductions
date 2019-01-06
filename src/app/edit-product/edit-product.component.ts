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
import { Dimensions } from '../model/dimensions';

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
  materialfinishes: MaterialFinish[] = [];

  hdisc: boolean = false;
  hcont: boolean = false;
  height_min: number;
  height_max: number;
  height_disc: string;

  wdisc: boolean = false;
  wcont: boolean = false;
  width_min: number;
  width_max: number;
  width_disc: string;

  ddisc: boolean = false;
  dcont: boolean = false;
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
  part: Part;
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
      this.name = this.product.name;
      this.categoryBefore = (<Category>this.product.category).description;
      this.category = this.categories.find(c => c.description == this.categoryBefore);
      this.materialfinishes = this.product.materialFinishes;
      let optproducts: OptionalProducts[] = this.product.optionalProducts;
      if (!(optproducts === undefined)) {
        this.convertPartsBefore(optproducts);
      }
      
      let heightDisc_ant = (<DiscreteDimension>this.product.dimensions.height);
      if (heightDisc_ant.discrete == null) {
        this.showDivNewAlturaContinua();
        
        this.height_max_ant = (<ContinuousDimension>this.product.dimensions.height).max;
        this.height_min_ant = (<ContinuousDimension>this.product.dimensions.height).min;
        this.height_min = this.height_min_ant;
        this.height_max = this.height_max_ant;
      } else {
        this.showDivNewAlturaDiscreta();
        this.height_disc_ant = (<DiscreteDimension>this.product.dimensions.height).discrete;
        this.height_disc = this.height_disc_ant;
      }

      let widthDisc_ant = (<DiscreteDimension>this.product.dimensions.width);
      if (widthDisc_ant.discrete == null) {
        this.showDivNewLarguraContinua();
        this.width_max_ant = (<ContinuousDimension>this.product.dimensions.width).max;
        this.width_min_ant = (<ContinuousDimension>this.product.dimensions.width).min;
        this.width_min = this.width_min_ant;
        this.width_max = this.width_max_ant;
      } else {
        this.showDivNewLarguraDiscreta();
        this.width_disc_ant = (<DiscreteDimension>this.product.dimensions.width).discrete;
        this.width_disc = this.width_disc_ant;
      }

      let depthDisc_ant = (<DiscreteDimension>this.product.dimensions.depth);
      if (depthDisc_ant.discrete == null) {
        this.showDivNewProfundidadeContinua();
        this.depth_max_ant = (<ContinuousDimension>this.product.dimensions.depth).max;
        this.depth_min_ant = (<ContinuousDimension>this.product.dimensions.depth).min;
        this.depth_min = this.depth_min_ant;
        this.depth_max = this.depth_max_ant;
      } else {
        this.showDivNewProfundidadeDiscreta();
        this.depth_disc_ant = (<DiscreteDimension>this.product.dimensions.depth).discrete;
        this.depth_disc = this.depth_disc_ant;
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
      if (!(result === undefined)) {
        for (let matfin of result) {
          let index: number = this.materialfinishes.findIndex(mf => (mf.id == matfin.id));

          if (index == -1) {
            this.materialfinishes.push(matfin);
          }
        }
      }
    });
  }

  openPartsDialog(): void {
    const dialogRef = this.dialog.open(SelectPartsDialog, {
      width: '700px',
      data:  this.product.id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result === undefined)) {
        this.optionalProducts = result;
        this.parts = [];
        this.convertToParts(this.optionalProducts);
      } else {
        this.optionalProducts = [];
        this.parts = [];
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

  confirm() {
    //check product name is not empty
    if (this.checkIfFieldIsEmptyOrNull([this.name])) {
      this.openbarNotEmpty('Nome do Produto');
      return;
    }

    //check category is selected
    if (this.checkIfFieldIsEmptyOrNull([this.category])) {
      this.openbarNotEmpty('Categoria');
      return;
    }

    // check at least one selected materialfinish
    if (!this.checkIfArrayHasAtLeastOneValue(this.materialfinishes)) {
      this.openbarAtLeastOne('MaterialAcabamento');
      return;
    }

    //check height is not empty & >0
    let h: Dimension = this.validateDimension('Altura', this.height_disc, this.height_min, this.height_max);
    if (h == null) {
      return;
    }

    //check width is not empty & >0 & check regex
    let w: Dimension = this.validateDimension('Largura', this.width_disc, this.width_min, this.width_max);
    if (w == null) {
      return;
    }

    //check depth is not empty  & >0 & check regex
    let d: Dimension = this.validateDimension('Profundidade', this.depth_disc, this.depth_min, this.depth_max);
    if (d == null) {
      return;
    }

    //check min&max occup is not empty & >0 & <100
    if (this.checkIfFieldIsEmptyOrNull(this.minOccup)) {
      this.openbarNotEmpty("Ocupação Mínima");
      return;
    }
    if (this.checkIfFieldIsEmptyOrNull(this.maxOccup)) {
      this.openbarNotEmpty("Ocupação Máxima");
      return;
    }
    if (this.checkNumberIsBeyondMinLimit(percentage_min_limit, this.minOccup)) {
      this.openbarBeyondMinLimit(percentage_min_limit, "Ocupação Mínima");
      return;
    }
    if (this.checkNumberIsBeyondMinLimit(percentage_min_limit, this.maxOccup)) {
      this.openbarBeyondMinLimit(percentage_min_limit, "Ocupação Máxima");
      return;
    }
    if (this.checkNumberIsBeyondMaxLimit(this.minOccup)) {
      this.openbarBeyondMaxLimit("Ocupação Mínima");
      return;
    }
    if (this.checkNumberIsBeyondMaxLimit(this.maxOccup)) {
      this.openbarBeyondMaxLimit("Ocupação Máxima");
      return;
    }

    //check max occup is higher than min occup
    if (this.maxOccup < this.minOccup) {
      this.openbarOtherMessage("Ocupação Máxima não pode ser superior à mínima.");
      return;
    }

    let dimensions: Dimensions = { width: w, height: h, depth: d };

    let prod = new Product(this.name, this.category, this.materialfinishes, dimensions,
      this.optionalProducts, this.minOccup, this.maxOccup);

    this.service.updateProduct(this.product.id, prod).subscribe(prod => {
      this.bar.open(
        `Sucesso: o produto foi editado.`,
        '', {
          duration: 2000,
        });
      this.back();
    }, error => {
      if (error.status == 401) {
        this.bar.open(
          'A sua sessão expirou ou não fez login. Por favor inicie sessão para continuar.',
          '', {
            duration: 2000,
          });
      } else {
        this.bar.open(
          `Erro: ${error.error}`,
          '', {
            duration: 2000,
          });
      }
    });

  }

  private validateDimension(dimension: string, discrete: string, min: number, max: number): Dimension {
    //if min and max are null and discrete is ok, then it is discrete
    if (this.checkIfFieldIsEmptyOrNull(min) && this.checkIfFieldIsEmptyOrNull(max)
      && !this.checkIfFieldIsEmptyOrNull(discrete)) {
      let array = discrete.split(';');
      for (let i: number = 0; i < array.length; i++) {
        let value = parseInt(array[i]);
        if (this.checkNumberIsBeyondMinLimit(dim_min_limit, value)) {
          this.openbarBeyondMinLimit(dim_min_limit, dimension);
          return null;
        }
      }

      let chosenDimension: DiscreteDimension = { discrete: discrete };
      return chosenDimension;

      //if min and max are not null and discrete is, it means it is continuous
    } else if (!this.checkIfFieldIsEmptyOrNull(min) && !this.checkIfFieldIsEmptyOrNull(max)
      && this.checkIfFieldIsEmptyOrNull(discrete)) {

      if (this.checkNumberIsBeyondMinLimit(dim_min_limit, min)) {
        this.openbarBeyondMinLimit(dim_min_limit, dimension + ' Mínima');
        return null;
      }

      if (this.checkNumberIsBeyondMinLimit(dim_min_limit, max)) {
        this.openbarBeyondMinLimit(dim_min_limit, dimension + ' Máxima');
        return null;
      }

      if (min > max) {
        this.openbarOtherMessage(dimension + ' mínima não pode ser superior à ' + dimension + ' máxima.');
        return null;
      }
      let chosenDimension: ContinuousDimension = { min: min, max: max };
      return chosenDimension;

    } else {
      // if discrete, min and max are empty, then
      this.openbarOtherMessage('Deve preencher dimensões para ' + dimension + '.');
      return null;
    }
  }

  /**
   * True if it is negative or 0
   * @param num
   * @param testName
   */
  private checkNumberIsBeyondMinLimit(limit: number, num: number): boolean {
    if (num < limit) {
      return true;
    }
    return false;
  }

  /**
   * True if it is above 100
   * @param num
   * @param testName
   */
  private checkNumberIsBeyondMaxLimit(num: number): boolean {
    if (num > max_limit) {
      return true;
    }
    return false;
  }

  /**
   * True if empty or null
   * @param fields
   */
  private checkIfFieldIsEmptyOrNull(field): boolean {
    if (field == null || field.toString().trim().length == 0) {
      return true;
    }
    return false;

  }

  /**
   *
   * True if has at least one element
   * @param array
   */
  private checkIfArrayHasAtLeastOneValue(array) {
    if (array.length < min_array_limit) {
      return false;
    }
    return true;
  }

  private openbarAtLeastOne(testName: string) {
    this.bar.open(
      `Deve escolher pelo menos um ` + testName + `.`,
      '', {
        duration: 2000,
      });
  }

  private openbarNotEmpty(testName: string) {
    this.bar.open(
      testName + ` não pode estar vazio. `,
      '', {
        duration: 2000,
      });
  }

  private openbarBeyondMinLimit(limit: number, testName: string) {
    this.bar.open(
      testName + ` não pode inferior a ` + limit + `.`,
      '', {
        duration: 2000,
      });
  }

  private openbarBeyondMaxLimit(testName: string) {
    this.bar.open(
      testName + ` não pode ser superior a ` + max_limit + `.`,
      '', {
        duration: 2000,
      });
  }

  private openbarOtherMessage(message: string) {
    this.bar.open(
      message,
      '', {
        duration: 2000,
      });
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
    this.hcont = false;
    this.hdisc = true;
    document.getElementById('newAlturaDiscreta').style.display = "block";
  }

  dispose_showDivNewAlturaDiscreta() {
    document.getElementById('newAlturaDiscreta').style.display = "none";
  }

  showDivNewAlturaContinua() {
    this.dispose_showDivNewAlturaDiscreta();
    this.height_disc = null;
    this.hcont = true;
    this.hdisc = false;
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
    this.wcont = false;
    this.wdisc = true;
    document.getElementById('newLarguraDiscreta').style.display = "block";
  }

  dispose_showDivNewLarguraDiscreta() {
    document.getElementById('newLarguraDiscreta').style.display = "none";
  }

  showDivNewLarguraContinua() {
    this.dispose_showDivNewLarguraDiscreta();
    this.wcont = true;
    this.wdisc = false;
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
    this.dcont = false;
    this.ddisc =true;
    document.getElementById('newProfundidadeDiscreta').style.display = "block";
  }

  dispose_showDivNewProfundidadeDiscreta() {
    document.getElementById('newProfundidadeDiscreta').style.display = "none";
  }

  showDivNewProfundidadeContinua() {
    this.dispose_showDivNewProfundidadeDiscreta();
    this.depth_disc = "";
    this.dcont = true;
    this.ddisc = false;
    document.getElementById('newProfundidadeContinua').style.display = "block";
  }

  dispose_showDivNewProfundidadeContinua() {
    document.getElementById('newProfundidadeContinua').style.display = "none";
  }

}
