import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from "@angular/material";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private bar: MatSnackBar, private router : Router, private authSrv : AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authSrv.isAuthenticated() && !this.authSrv.isAClient()) {
      return true;
    }
    this.router.navigate(['/home']);
    this.bar.open("Não tem permissão para aceder à página.", "", {duration: 3500});
    return false;
  }
}
