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
    CollectionComponent
  ],
  imports: [
    BrowserModule,
    UiModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
