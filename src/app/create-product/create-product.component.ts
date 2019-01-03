import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialFinish } from '../model/material-finish';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';
import { MaterialFinishService } from '../services/material-finish.service';
import { SelectMaterialFinishesDialog } from './select-material-finish-dialog';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { SelectPartsDialog } from './select-parts-dialog';
import { Dimension } from '../model/dimension';
import { ContinuousDimension } from '../model/continuous-dimension';
import { DiscreteDimension } from '../model/discrete-dimension';
import { OptionalProducts } from '../model/optional-products';
import { Dimensions } from '../model/dimensions';

const min_array_limit: number = 1;
const dim_min_limit: number = 1;
const percentage_min_limit: number = 0;
const max_limit: number = 100;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productName: string = "";
  categories: Category[];
  materialfinishes: MaterialFinish[] = [];
  parts: OptionalProducts[] = [];
  productMinOccup: number;
  productMaxOccup: number;

  heightMin: number = null;
  heightMax: number = null;
  heightDiscrete: string = "";
  HisDiscrete: boolean = true;

  widthMin: number = null;
  widthMax: number = null;
  widthDiscrete: string = "";

  depthMin: number = null;
  depthMax: number = null;
  depthDiscrete: string = "";

  category: Category;

  discretePattern: string = "[0-9]+([;][0-9]+)*";

  constructor(
    private router: Router,
    private bar: MatSnackBar,
    private service: ProductService,
    private catService: CategoryService,
    private matfinService: MaterialFinishService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCategories();
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
      console.log('The dialog was closed');
      console.log(result);
      this.materialfinishes = result;
    });
  }

  openPartsDialog(): void {
    const dialogRef = this.dialog.open(SelectPartsDialog, {
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.parts = result;
    });
  }

  removeFromMaterialList(materialfinish: MaterialFinish): void {
    let index: number = this.materialfinishes.findIndex(mat => mat.textureUrl == materialfinish.textureUrl);
    this.materialfinishes.splice(index, min_array_limit);
  }


  confirm() {
    //check product name is not empty
    if (this.checkIfFieldIsEmptyOrNull([this.productName])) {
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
    let h: Dimension = this.validateDimension('Altura', this.heightDiscrete, this.heightMin, this.heightMax);
    console.log('h');
    console.log(h);
    if (h == null) {
      return;
    }

    //check width is not empty & >0 & check regex
    let w: Dimension = this.validateDimension('Largura', this.widthDiscrete, this.widthMin, this.widthMax);
    console.log('w');
    console.log(w);
    if (w == null) {
      return;
    }
    

    //check depth is not empty  & >0 & check regex
    let d: Dimension = this.validateDimension('Profundidade', this.depthDiscrete, this.depthMin, this.depthMax);
    console.log('d');
    console.log(d);
    if (d == null) {
      return;
    }

    //check min&max occup is not empty & >0 & <100
    if (this.checkIfFieldIsEmptyOrNull(this.productMinOccup)) {
      this.openbarNotEmpty("Ocupação Mínima");
      return;
    }
    if (this.checkIfFieldIsEmptyOrNull(this.productMaxOccup)) {
      this.openbarNotEmpty("Ocupação Máxima");
      return;
    }
    if (this.checkNumberIsBeyondMinLimit(percentage_min_limit, this.productMinOccup)) {
      this.openbarBeyondMinLimit(percentage_min_limit, "Ocupação Mínima");
      return;
    }
    if (this.checkNumberIsBeyondMinLimit(percentage_min_limit, this.productMaxOccup)) {
      this.openbarBeyondMinLimit(percentage_min_limit, "Ocupação Máxima");
      return;
    }
    if (this.checkNumberIsBeyondMaxLimit(this.productMinOccup)) {
      this.openbarBeyondMaxLimit("Ocupação Mínima");
      return;
    }
    if (this.checkNumberIsBeyondMaxLimit(this.productMaxOccup)) {
      this.openbarBeyondMaxLimit("Ocupação Máxima");
      return;
    }

    //check max occup is higher than min occup
    if (this.productMaxOccup < this.productMinOccup) {
      this.openbarOtherMessage("Ocupação Máxima não pode ser superior à mínima.");
      return;
    }

    let dimensions: Dimensions = { width: w, height: h, depth: d };
    let parts: OptionalProducts[] = [];
    let prod = new Product(this.productName, this.category, this.materialfinishes, dimensions,
      parts, this.productMinOccup, this.productMaxOccup);
    console.log('prod criado');
    console.log(prod);

    this.service.createProduct(prod).subscribe(cat => {
      this.bar.open(
        `Sucesso: o produto foi criado.`,
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
        console.log('outro erro')
        this.bar.open(
          `Erro: ${error.error}`,
          '', {
            duration: 2000,
          });
      }
    });

  }

  private validateDimension(dimension: string, discrete: string, min: number, max: number): Dimension {
    console.log('entrou');
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

      if (this.checkNumberIsBeyondMinLimit(dim_min_limit,min)) {
        this.openbarBeyondMinLimit(dim_min_limit,dimension + ' Mínima');
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
  private checkNumberIsBeyondMinLimit(limit:number, num: number): boolean {
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

  private openbarBeyondMinLimit(limit:number, testName: string) {
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

  back() {
    this.router.navigateByUrl('/products');
  }

  updateParts() {
    for (let i = 0; i < this.parts.length; i++) {
      this.writeOptionalOrMandatory(this.parts[i].part.name);
    }
  }

  private writeOptionalOrMandatory(element: string) {
    var label = document.getElementById(element);
    if (label.innerHTML === "true") {
      label.innerHTML = "Opcional";
    } else if (label.innerHTML === "false") {
      label.innerHTML = "Obrigatório";
    }
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
    this.heightMin = null;
    this.heightMax = null;
    document.getElementById('newAlturaDiscreta').style.display = "block";
  }

  dispose_showDivNewAlturaDiscreta() {
    document.getElementById('newAlturaDiscreta').style.display = "none";
  }

  showDivNewAlturaContinua() {
    this.dispose_showDivNewAlturaDiscreta();
    this.heightDiscrete = null;
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
    this.widthMax = null;
    this.widthMin = null;
    document.getElementById('newLarguraDiscreta').style.display = "block";
  }

  dispose_showDivNewLarguraDiscreta() {
    document.getElementById('newLarguraDiscreta').style.display = "none";
  }

  showDivNewLarguraContinua() {
    this.dispose_showDivNewLarguraDiscreta();
    this.widthDiscrete = "";
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
    this.depthMin = null;
    this.depthMax = null;
    document.getElementById('newProfundidadeDiscreta').style.display = "block";
  }

  dispose_showDivNewProfundidadeDiscreta() {
    document.getElementById('newProfundidadeDiscreta').style.display = "none";
  }

  showDivNewProfundidadeContinua() {
    this.dispose_showDivNewProfundidadeDiscreta();
    this.depthDiscrete = "";
    document.getElementById('newProfundidadeContinua').style.display = "block";
  }

  dispose_showDivNewProfundidadeContinua() {
    document.getElementById('newProfundidadeContinua').style.display = "none";
  }
}



