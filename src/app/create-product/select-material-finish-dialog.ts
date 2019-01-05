import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialFinish } from '../model/material-finish';
import { MaterialFinishService } from '../services/material-finish.service';


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
  dataSource = new MatTableDataSource<MaterialFinish>();

  materialFinishes: MaterialFinish[];
  selection = new SelectionModel<MaterialFinish>(true, []);

  constructor(private matacabService: MaterialFinishService, private bar: MatSnackBar,
    public dialogRef: MatDialogRef<SelectMaterialFinishesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialFinish[]) { }


  ngOnInit() {
    this.getMaterialFinishes();
  }

  private getMaterialFinishes(): void {
    this.matacabService.getMaterialFinishes().subscribe(data => {
      this.materialFinishes = <MaterialFinish[]>data;
      this.dataSource = new MatTableDataSource(this.materialFinishes);
    }, error => {
      this.bar.open(
        `Ocorreu um erro ao tentar obter os materiais acabamentos do servidor: ${error.error}`,
        '', {
          duration: 2000,
        });
    });
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


