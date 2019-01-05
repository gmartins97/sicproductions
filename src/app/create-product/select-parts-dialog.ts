import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { Category } from '../model/category';
import { OptionalProducts } from '../model/optional-products';
import { ActivatedRoute } from '@angular/router';

/**
 * @title Table with selection
 */
@Component({
  selector: 'select-parts-dialog',
  styleUrls: ['./select-parts-dialog.css'],
  templateUrl: './select-parts-dialog.html',
})
export class SelectPartsDialog {
  displayedColumns: string[] = ['select', 'optional', 'name'/*, 'category'*/];
  dataSource = new MatTableDataSource<Product>();
  chosenParts: OptionalProducts[];
  products: Product[] = [];
  selection = new SelectionModel<Product>(true, []);
  boolselection: boolean[];

  btnHO : boolean[] = [];
  btnHM : boolean[] = [];

  constructor(private service: ProductService, private bar: MatSnackBar, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<SelectPartsDialog>,
    @Inject(MAT_DIALOG_DATA) public id: number) { }


  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this.service.getProducts().subscribe(data => {
      this.products = <Product[]>data;
      let index: number = this.products.findIndex(p => (p.id == this.id));
     
      if (!(index === undefined) && !(index == -1)) {
        this.products.splice(index, 1);
      }
        
      this.dataSource = new MatTableDataSource(this.products);
    }, error => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter os produtos do servidor: ${error.error}`,
        '', {
          duration: 2000,
        });
    });
  }

  deselectProduct(index: number) {
    this.btnHM[index] = null;
    this.btnHO[index] = null;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.btnHM = [];
      this.btnHO = [];
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
      
  }

  convertToOptionalProduct(products: Product[]){
    let parts: OptionalProducts[] = [];
    let j = 0;
    for (let i = 0; i < products.length; i++) {
      while (this.btnHO[j] != true && this.btnHO[j] != false && j < this.products.length) {
        j++;
      }

      let part: OptionalProducts = { productId: products[i].id, optional: this.btnHO[j] };
      j++;
      parts.push(part);
    }
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].optional != true && parts[i].optional != false) {
        this.openbar("Deve escolher opcional ou obrigatório");
        return;
      }
    }
    this.dialogRef.close(parts);
    
  }

  private openbar(message: string) {
    this.bar.open(
      message,
      '', {
        duration: 2000,
      });
  }
}
