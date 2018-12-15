import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CheckboxModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { LoginComponent } from '../login/login.component';
import { MaterialComponent } from '../material/material.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { CollectionComponent } from '../collection/collection.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { SurfaceFinishComponent } from '../surface-finish/surface-finish.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'surfaceFinishes', component: SurfaceFinishComponent },
  { path: 'materials', component: MaterialComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'products', component: ProductComponent },
  { path: 'catalogues', component: CatalogueComponent },
  { path: 'collections', component: CollectionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports: [LayoutComponent, RouterModule, MDBBootstrapModule, BrowserAnimationsModule, MatCheckboxModule, MatTooltipModule, MatInputModule, MatTableModule],
  imports: [MDBBootstrapModule.forRoot(), RouterModule.forRoot(appRoutes),
    CommonModule, CheckboxModule, WavesModule, ButtonsModule, BrowserAnimationsModule, MatCheckboxModule, MatTooltipModule, MatInputModule, MatTableModule
  ]
})
export class UiModule { }
