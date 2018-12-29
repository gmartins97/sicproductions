import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly AUTH_URL : string = "https://siccatalogue.azurewebsites.net/api/Auth";

  constructor(private httpClient: HttpClient) { }

  signUp(username: string, password: string, confirmPassword : string) : Observable<any> {
    return this.httpClient.post(`${this.AUTH_URL}/SignUp`, {Username: username, Password : password, ConfirmPassword : confirmPassword});
  }

  login(username: string, password : string) : Observable<any> {
    return this.httpClient.post(`${this.AUTH_URL}/Login`, {Username: username, Password: password});
  }

  loginSucceeded(data) : void {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("expiryDate", data.expiration);
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

  getToken() : string {
    return localStorage.getItem("access_token");
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiryDate');
    this.isLoggedIn.next(this.isAuthenticated());
  }
}
