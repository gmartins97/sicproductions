import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialFinish } from '../model/material-finish';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';
import { MaterialFinishService } from '../services/material-finish.service';
import { SelectMaterialFinishesDialog } from './select-material-finish-dialog';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productName: string;
  categories: Category[];
  materialfinishes: MaterialFinish[];
  productHeights;
  productWidths;
  productDepths;
  productMinOccup: number;
  productMaxOccup: number;

  constructor(
    private router: Router,
    private bar: MatSnackBar,
    private catService: CategoryService,
    private matfinService: MaterialFinishService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getMaterialFinishes();
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

  getMaterialFinishes(): void {
    //this.matfinService.getMaterialFinishes().subscribe(data => {
    //  this.categories = data;
    //}, error => {
    //  this.bar.open(
    //    `Ocorreu um erro ao tentar obter as categorias do servidor...`,
    //    '', {
    //      duration: 2000,
    //    });
    //});
  }

  chooseMaterialFinishes() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectMaterialFinishesDialog, {
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.materialfinishes = result;
    });
  }

  confirm() {
    this.bar.open(`Tem calma que isto ainda não está implementado.`, '', { duration: 2000 });
    this.router.navigateByUrl('/products');
  }

  back() {
    this.router.navigateByUrl('/products');
  }
}


