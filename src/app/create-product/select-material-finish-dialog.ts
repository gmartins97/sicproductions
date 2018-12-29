import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SurfaceFinish } from '../model/surface-finish';
import { Material } from '../model/Material';

export interface MaterialFinish {
  material: Material;
  finish: SurfaceFinish;
  increment: number;
  texture: string;
}

const mat1 = new Material("Madeira", 3.89);
const finish1 = new SurfaceFinish("Serrado");
const increment1 = 3.11;
const texture1 = "https://www.sharecg.com/images/medium/24765.jpg";
const mat2 = new Material("Granito", 60.5);
const finish2 = new SurfaceFinish("Polido");
const increment2 = 5.5;
const texture2 = "https://i.pinimg.com/736x/65/ac/06/65ac0600e9c46d59f14e58e1200acff3--granite-brazil.jpg";

const MaterialFinishes: MaterialFinish[] = [{ material: mat1, finish: finish1, increment: increment1, texture: texture1 },
{ material: mat2, finish: finish2, increment: increment2, texture: texture2 }];


/**
 * @title Table with selection
 */
@Component({
  selector: 'select-material-finish.dialog',
  styleUrls: ['./select-material-finish-dialog.css'],
  templateUrl: './select-material-finish-dialog.html',
})
export class SelectMaterialFinishesDialog {
  displayedColumns: string[] = ['select', 'position', 'materialName', 'finishName', 'increment', 'totalPrice', 'texture'];
  dataSource = new MatTableDataSource(MaterialFinishes);

  materialFinishes: MaterialFinish[];
  selection = new SelectionModel<MaterialFinish>(true, []);

  constructor(/*private matacabService: MaterialFinishService, */private bar: MatSnackBar,
    public dialogRef: MatDialogRef<SelectMaterialFinishesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialFinish[]) { }


  ngOnInit() {
    //this.getMaterialFinishes();
  }

  private getMaterialFinishes(): void {
    //this.matacabservice.getMaterialFinishes().subscribe(data => {
    //  this.materialFinishes = <MaterialFinish[]>data;
    //  this.dataSource = new MatTableDataSource(this.materialFinishes);
    //}, error => {
    //  this.bar.open(
    //    `Ocorreu um erro ao tentar obter os materiais do servidor: ${error.error}`,
    //    '', {
    //      duration: 2000,
    //    });
    //});
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}


