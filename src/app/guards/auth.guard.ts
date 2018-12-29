import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private bar: MatSnackBar, private router : Router, private authSrv : AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authSrv.isAuthenticated()) {
        return true;
      }
    this.router.navigate(['/login']);
      this.bar.open("Não tem permissão para aceder à página. Por favor inicie sessão.", "", {duration: 3500});
    return false;
  }
}
