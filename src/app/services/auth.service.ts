import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  public isClient : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAClient());

  private readonly MANAGER_AUTH_URL : string = "https://siccatalogue.azurewebsites.net/api/Auth";

  private readonly CLIENT_AUTH_URL : string = "https://sicproductions.herokuapp.com/api/auth";

  constructor(private httpClient: HttpClient) { }

  managerSignUp(username: string, password: string, confirmPassword : string, companyPassword: string) : Observable<any> {
    return this.httpClient.post(`${this.MANAGER_AUTH_URL}/SignUp`, {Username: username, Password : password, ConfirmPassword : confirmPassword, CompanyPassword: companyPassword});
  }

  clientSignUp(username: string, password: string, confirmPassword : string, secret: string, token: string) : Observable<any> {
    return this.httpClient.post(`${this.CLIENT_AUTH_URL}/signup`, {username: username, password : password, confirmPassword : confirmPassword, tempSecret: secret, token: token});
  }

  clientSetupSecret() : Observable<any> {
    return this.httpClient.get(`${this.CLIENT_AUTH_URL}/setupSecret`);
  }

  managerLogin(username: string, password : string) : Observable<any> {
    return this.httpClient.post(`${this.MANAGER_AUTH_URL}/Login`, {Username: username, Password: password});
  }

  clientLogin(username: string, password : string) : Observable<any> {
    return this.httpClient.post(`${this.CLIENT_AUTH_URL}/login`, {username: username, password: password});
  }

  loginSucceeded(data) : void {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("expiryDate", data.expiration);
    localStorage.setItem("username", data.username);
    this.isLoggedIn.next(this.isAuthenticated());
  }

  isAuthenticated() : boolean {
    let token = localStorage.getItem("access_token");
    let expiryDate = localStorage.getItem("expiryDate");
    if(token != null && expiryDate != null) {
      return Date.now() < Date.parse(expiryDate);
    }
    return false;
  }

  isAClient() : boolean {
    return localStorage.getItem("isClient") == "true";
  }

  setClient(value : boolean) {
    localStorage.setItem("isClient", `${value}`);
    this.isClient.next(this.isAClient());
  }

  getToken() : string {
    return localStorage.getItem("access_token");
  }

  getLoggedInUsername() : string {
    return localStorage.getItem("username");
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('username');
    localStorage.removeItem('isClient');
    this.isLoggedIn.next(this.isAuthenticated());
  }
}
