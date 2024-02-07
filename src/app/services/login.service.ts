import { Injectable } from '@angular/core';
import {HttpRequestService} from "./http-request.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpRequestService: HttpRequestService) { }

  login() {
    let userEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
    let userPassword = (document.getElementById("userPassword")as HTMLInputElement).value;
    let userData = {userEmail, userPassword};
    try {
      let loginResponse = this.httpRequestService.requestLogin(userData);
      localStorage.setItem(loginResponse.)
    } catch {

    }
  }
}
