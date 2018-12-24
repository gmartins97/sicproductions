import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_URL : string = "https://siccatalogue.azurewebsites.net/api/Auth";

  constructor(private httpClient: HttpClient, private router : Router) { }

  signUp(username: string, email: string, password: string) : Observable<any> {
    return this.httpClient.post(`${this.AUTH_URL}/SignUp`, {Username: username, Email: email, Password : password});
  }

  login(username: string, password : string) : Observable<any> {
    return this.httpClient.post(`${this.AUTH_URL}/Login`, {Username: username, Password: password});
  }

  isAuthenticated() : boolean {
    let token = localStorage.getItem("access_token");
    let expiryDate = localStorage.getItem("expiryDate");
    if(token != null && expiryDate != null) {
      return Date.now() < Date.parse(expiryDate);
    }
    return false;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiryDate');
    window.location.href = "/login";
  }
}
