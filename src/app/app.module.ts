import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SurfaceFinishComponent } from './surface-finish/surface-finish.component';
import { MaterialComponent } from './material/material.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CollectionComponent } from './collection/collection.component';
import { CreateSurfaceFinishComponent } from './create-surface-finish/create-surface-finish.component';
import { EditSurfaceFinishComponent } from './edit-surface-finish/edit-surface-finish.component';
import { CreateMaterialComponent } from './create-material/create-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MaterialFinishComponent } from './material-finish/material-finish.component';
import { ProductConfiguratorComponent } from './product-configurator/product-configurator.component';
import { ClientCatalogueComponent } from './client-catalogue/client-catalogue.component';
import { CreateMaterialFinishComponent } from './create-material-finish/create-material-finish.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatDialog } from '@angular/material/dialog';
import { EditMaterialFinishComponent } from './edit-material-finish/edit-material-finish.component';
import { ShowProductInfoComponent } from './show-product-info/show-product-info.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { OrdersComponent } from './orders/orders.component';
import { ShowOrdersInfoComponent } from './show-orders-info/show-orders-info.component';
import { CreateCatalogueComponent } from './create-catalogue/create-catalogue.component';
import { EditCatalogueComponent } from './edit-catalogue/edit-catalogue.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { ClientCataloguesComponent } from './client-catalogues/client-catalogues.component';
import { EditEncomendaComponent } from './edit-encomenda/edit-encomenda.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomePageComponent,
    SurfaceFinishComponent,
    MaterialComponent,
    CategoryComponent,
    ProductComponent,
    CatalogueComponent,
    CollectionComponent,
    CreateSurfaceFinishComponent,
    EditSurfaceFinishComponent,
    CreateMaterialComponent,
    EditMaterialComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    MaterialFinishComponent,
    ProductConfiguratorComponent,
    ClientCatalogueComponent,
    CreateMaterialFinishComponent,
    CreateProductComponent,
    EditProductComponent,
    EditMaterialFinishComponent,
    ShowProductInfoComponent,
    TermsAndConditionsComponent,
    OrdersComponent,
    ShowOrdersInfoComponent,
    CreateCatalogueComponent,
    EditCatalogueComponent,
    CreateCollectionComponent,
    EditCollectionComponent,
    ClientCataloguesComponent,
    EditEncomendaComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    ReactiveFormsModule
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
