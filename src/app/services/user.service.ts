import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {StatusMessageService} from "./status-message.service";
import {Router} from "@angular/router";
import {TokenObject} from "../interfaces/token-object";
import {SignupData} from "../interfaces/signup-data";
import {CurrentUserData} from "../interfaces/current-user-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loginApiURL = "http://127.0.0.1:8000/api/registration/auth/";
  private currentUser: CurrentUserData = {
    email: "user@example.com",
    first_name: "string",
    last_name: "string",
    username: "string"
  }

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

  signup(data: SignupData) {
    this._signupApiCall(data).subscribe((currUserData) => {
      console.log(currUserData);
      this.currentUser = currUserData;

      this.login(data.email, data.password);
    })
  }

  private _loginApiCall(userData: {[key:string]:string}): Observable<TokenObject> {
    return this.http.post<TokenObject>(this.loginApiURL + 'signin', userData).pipe(
      catchError((error) => {
        console.error("API Error:", error);
        this.statusMessageService.showStatusMessage('Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!', 'error');
        return throwError(() => "Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!");
      })
    );
  }

  private _signupApiCall(data: SignupData): Observable<CurrentUserData> {
    return this.http.post<CurrentUserData>(this.loginApiURL + 'signup', data).pipe(
      catchError((error) => {
        console.error("API Error:", error);
        this.statusMessageService.showStatusMessage('Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!', 'error');
        return throwError(() => "Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!");
      })
    );
  }

  getLoggedIn() {
    return this.loggedIn$;
  }

}
