import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
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
import { OrdersComponent } from '../orders/orders.component';
import { ShowOrdersInfoComponent } from '../show-orders-info/show-orders-info.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SurfaceFinishService } from '../services/surface-finish.service';
import { MatSnackBarModule, MatCardModule, MatIconModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { CreateMaterialComponent } from '../create-material/create-material.component';
import { EditMaterialComponent } from '../edit-material/edit-material.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { MaterialFinishComponent } from '../material-finish/material-finish.component';
import { ProductConfiguratorComponent } from '../product-configurator/product-configurator.component';
import {MatSelectModule} from '@angular/material/select';
import {AuthGuard} from "../guards/auth.guard";
import {ClientGuard} from "../guards/client.guard";
import { ClientCatalogueComponent } from '../client-catalogue/client-catalogue.component';
import { CreateMaterialFinishComponent } from '../create-material-finish/create-material-finish.component';
import { MaterialFinishService } from '../services/material-finish.service';
import { MaterialService } from '../services/material.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule,  MatButtonModule } from '@angular/material';
import { SelectMaterialFinishesDialog } from '../create-product/select-material-finish-dialog';
import { EditMaterialFinishComponent } from '../edit-material-finish/edit-material-finish.component';
import { ShowProductInfoComponent } from '../show-product-info/show-product-info.component';
import { ProductService } from '../services/product.service';
import { orderService } from '../services/order.service';
import { SelectPartsDialog } from '../create-product/select-parts-dialog';
import { CatalogueService } from '../services/catalogue.service';
import { CreateCatalogueComponent } from '../create-catalogue/create-catalogue.component';
import { EditCatalogueComponent } from '../edit-catalogue/edit-catalogue.component';
import { CreateCollectionComponent } from '../create-collection/create-collection.component';
import { EditCollectionComponent } from '../edit-collection/edit-collection.component';
import { ClientCataloguesComponent } from '../client-catalogues/client-catalogues.component';
import { EditEncomendaComponent } from '../edit-encomenda/edit-encomenda.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'surfaceFinishes', component: SurfaceFinishComponent, canActivate:[ClientGuard] },
  { path: 'surfaceFinishes/new', component: CreateSurfaceFinishComponent, canActivate:[ClientGuard] },
  { path: 'surfaceFinishes/edit/:id', component: EditSurfaceFinishComponent, canActivate:[ClientGuard] },
  { path: 'materials', component: MaterialComponent, canActivate:[ClientGuard] },
  { path: 'materials/new', component: CreateMaterialComponent, canActivate:[ClientGuard] },
  { path: 'materials/edit/:id', component: EditMaterialComponent, canActivate:[ClientGuard] },
  { path: 'materialfinishes', component: MaterialFinishComponent, canActivate:[ClientGuard] },
  { path: 'materialfinishes/new', component: CreateMaterialFinishComponent, canActivate:[ClientGuard] },
  { path: 'materialfinishes/edit/:id', component: EditMaterialFinishComponent, canActivate:[ClientGuard] },
  { path: 'categories', component: CategoryComponent, canActivate:[ClientGuard] },
  { path: 'categories/new', component: CreateCategoryComponent, canActivate:[ClientGuard] },
  { path: 'categories/edit/:id', component: EditCategoryComponent, canActivate:[ClientGuard] },
  { path: 'products', component: ProductComponent, canActivate: [ClientGuard] },
  { path: 'products/new', component: CreateProductComponent, canActivate: [ClientGuard] },
  { path: 'products/edit/:id', component: EditProductComponent, canActivate: [ClientGuard] },
  { path: 'products/show/:id', component: ShowProductInfoComponent, canActivate: [ClientGuard] },
  { path: 'catalogues', component: CatalogueComponent, canActivate:[ClientGuard] },
  { path: 'catalogues/new', component: CreateCatalogueComponent, canActivate:[ClientGuard] },
  { path: 'catalogues/edit/:id', component: EditCatalogueComponent, canActivate:[ClientGuard] },
  { path: 'collections', component: CollectionComponent, canActivate:[ClientGuard] },
  { path: 'productConfigurator/configure/:id', component: ProductConfiguratorComponent, canActivate:[AuthGuard] },
  { path: 'collections/new', component: CreateCollectionComponent, canActivate:[ClientGuard] },
  { path: 'collections/edit/:id', component: EditCollectionComponent, canActivate:[ClientGuard] },
  { path: 'clientCatalogue/:id', component: ClientCatalogueComponent, canActivate:[AuthGuard] },
  { path: 'clientCatalogues', component: ClientCataloguesComponent, canActivate:[AuthGuard] },
  { path: 'orders/:username', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'orders/show/:id', component: ShowOrdersInfoComponent, canActivate: [AuthGuard] },
  { path: 'orders/edit/:id', component: EditEncomendaComponent, canActivate: [AuthGuard] },
  { path: 'TermsAndConditions', component: TermsAndConditionsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, SelectMaterialFinishesDialog, SelectPartsDialog],
  exports: [
    LayoutComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatIconModule
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
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
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [
    SurfaceFinishService,
    MaterialFinishService,
    MaterialService,
    ProductService,
    CatalogueService,
    orderService,
    MatDatepickerModule,  
    MatDialog,
  ],
  entryComponents: [SelectMaterialFinishesDialog, SelectPartsDialog]
})
export class UiModule { }
