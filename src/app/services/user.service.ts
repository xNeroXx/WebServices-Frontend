import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {StatusMessageService} from "./status-message.service";
import {Router} from "@angular/router";

export interface TokenObject {
  token: {
    access_token: string,
    refresh_token: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loginApiURL = "http://127.0.0.1:8000/api/registration/auth/";

  constructor(private http: HttpClient, private statusMessageService: StatusMessageService, private router: Router) { }

  login(userEmail: string = '', userPassword: string = '') {
    let userData = {'email': userEmail, 'password': userPassword};

    this._loginApiCall(userData).subscribe(data => {
      console.log(data);
      localStorage.setItem("access_token", data.token.access_token);
      localStorage.setItem("refresh_token", data.token.refresh_token);
      this.loggedIn$.next(true);
      this.router.navigate([''])
    });


  }

  private _loginApiCall(userData: {[key:string]:string}): Observable<TokenObject> {
    return this.http.post<TokenObject>(this.loginApiURL + 'signin', userData).pipe(
      catchError((error) => {
        console.error("API Error:", error);
        this.statusMessageService.showStatusMessage('Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!', 'error');
        return throwError(() => "Something went wrong. Please try again later.");
      })
    );
  }

  getLoggedIn() {
    return this.loggedIn$;
  }

}
