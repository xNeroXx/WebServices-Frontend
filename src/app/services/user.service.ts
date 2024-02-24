import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {StatusMessageService} from "./status-message.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginApiURL = "https://api.example.com" //todo;

  constructor(private http: HttpClient, private statusMessageService: StatusMessageService) { }

  login(userEmail: string = '', userPassword: string = '') {
    let userData = {userEmail, userPassword};

    this.loginApiCall(userData).subscribe(data => {
      let userToken = data;
      console.log(userToken);
      localStorage.setItem("access_token", JSON.stringify(userToken['access_token']));
    });

  }

  loginApiCall(userData: {[key:string]:string}): Observable<any> {
    return this.http.post(this.loginApiURL, userData).pipe(
      catchError((error) => {
        console.error("API Error:", error);
        this.statusMessageService.showStatusMessage('error', 'error');
        return throwError(() => "Something went wrong. Please try again later.");
      })
    );
  }
}
