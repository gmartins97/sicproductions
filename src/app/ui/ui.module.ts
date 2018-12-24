import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { CreateSurfaceFinishComponent } from '../create-surface-finish/create-surface-finish.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { EditSurfaceFinishComponent } from '../edit-surface-finish/edit-surface-finish.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SurfaceFinishService } from '../services/surface-finish.service';
import { MatSnackBarModule } from '@angular/material';
import { CreateMaterialComponent } from '../create-material/create-material.component';
import { EditMaterialComponent } from '../edit-material/edit-material.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { MaterialFinishComponent } from '../material-finish/material-finish.component';
import { ProductConfiguratorComponent } from '../product-configurator/product-configurator.component';
import {MatSelectModule} from '@angular/material/select';
import {AuthGuard} from "../guards/auth.guard";
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'surfaceFinishes', component: SurfaceFinishComponent, canActivate:[AuthGuard] },
  { path: 'surfaceFinishes/new', component: CreateSurfaceFinishComponent, canActivate:[AuthGuard] },
  { path: 'surfaceFinishes/edit/:id', component: EditSurfaceFinishComponent, canActivate:[AuthGuard] },
  { path: 'materials', component: MaterialComponent, canActivate:[AuthGuard] },
  { path: 'materials/new', component: CreateMaterialComponent, canActivate:[AuthGuard] },
  { path: 'materials/edit/:id', component: EditMaterialComponent, canActivate:[AuthGuard] },
  { path: 'materialfinishes', component: MaterialFinishComponent, canActivate:[AuthGuard] },
  { path: 'categories', component: CategoryComponent, canActivate:[AuthGuard] },
  { path: 'categories/new', component: CreateCategoryComponent, canActivate:[AuthGuard] },
  { path: 'categories/edit/:id', component: EditCategoryComponent, canActivate:[AuthGuard] },
  { path: 'products', component: ProductComponent, canActivate:[AuthGuard] },
  { path: 'catalogues', component: CatalogueComponent, canActivate:[AuthGuard] },
  { path: 'collections', component: CollectionComponent, canActivate:[AuthGuard] },
  { path: 'productConfigurator', component: ProductConfiguratorComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports: [
    LayoutComponent,
    RouterModule,
    FormsModule,
    MDBBootstrapModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    CommonModule, 
    FormsModule, 
    CheckboxModule, 
    WavesModule, 
    ButtonsModule, 
    BrowserAnimationsModule, 
    MatCheckboxModule, 
    MatTooltipModule, 
    MatInputModule, 
    MatTableModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    CheckboxModule,
    WavesModule,
    ButtonsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [
    SurfaceFinishService
  ]
})
export class UiModule { }
