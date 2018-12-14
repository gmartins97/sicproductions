import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CheckboxModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports: [LayoutComponent, RouterModule, MDBBootstrapModule, BrowserAnimationsModule, MatCheckboxModule],
  imports: [MDBBootstrapModule.forRoot(), RouterModule.forRoot(appRoutes),
    CommonModule, CheckboxModule, WavesModule, ButtonsModule, BrowserAnimationsModule, MatCheckboxModule
  ]
})
export class UiModule { }
