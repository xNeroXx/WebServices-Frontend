import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {StatusMessageService} from "./status-message.service";

export interface TokenObject {
  access_token: string,
  refresh_token: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginApiURL = "http://127.0.0.1:8000/api/registration/auth/";

  constructor(private http: HttpClient, private statusMessageService: StatusMessageService) { }

  login(userEmail: string = '', userPassword: string = '') {
    let userData = {userEmail, userPassword};

    this._loginApiCall(userData).subscribe(data => {
      console.log(data);
      localStorage.setItem("access_token", data['access_token']);
    });

  }

  private _loginApiCall(userData: {[key:string]:string}): Observable<TokenObject> {
    return this.http.post<TokenObject>(this.loginApiURL + '', userData).pipe(
      catchError((error) => {
        console.error("API Error:", error);
        this.statusMessageService.showStatusMessage('Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!', 'error');
        return throwError(() => "Something went wrong. Please try again later.");
      })
    );
  }
}
