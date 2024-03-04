import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {StatusMessageService} from "./status-message.service";
import {Router} from "@angular/router";
import {TokenObject} from "../interfaces/token-object";
import {SignupData} from "../interfaces/signup-data";
import {CurrentUserData} from "../interfaces/current-user-data";
import {SignupResponse} from "../interfaces/signup-response";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loginApiURL = "http://127.0.0.1:8000/api/registration/auth/";
  private getCurrentUserURL = 'http://127.0.0.1:8000/api/user/me';
  private currentUsername: string = '';
  private currentUser: CurrentUserData = {
    "id": 0,
    "email": "user@example.com",
    "first_name": "string",
    "last_name": "string",
    "username": "string",
    "address": {
      "street": "string",
      "house_number": 0,
      "postal_code": 0,
      "city": "string",
      "country": "string",
    }
  }

  constructor(private http: HttpClient, private statusMessageService: StatusMessageService, private router: Router) {
  }

  login(userEmail: string = '', userPassword: string = '') {
    let userData = {'email': userEmail, 'password': userPassword};

    this._loginApiCall(userData).subscribe(data => {
      localStorage.setItem("access_token", data.token.access_token);
      localStorage.setItem("refresh_token", data.token.refresh_token);
      this.loggedIn$.next(true);
      this.router.navigate([''])
    });
  }

  signup(data: SignupData) {
    this._signupApiCall(data).subscribe((userdata) => {
      this.currentUsername = userdata.username;
      this.login(data.email, data.password);
    })
  }

  getLoggedIn() {
    return this.loggedIn$;
  }

  logout() {
    localStorage.clear();
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  loadCurrentUserData() {
    this.http.get<CurrentUserData>(this.getCurrentUserURL).subscribe((data) => {
      this.currentUser = data;
    })
  }

  getCurrentUsername() {
    return this.currentUser.username;
  }

  getUserData() {
    return this.currentUser;
  }

  private _loginApiCall(userData: { [key: string]: string }): Observable<TokenObject> {
    return this.http.post<TokenObject>(this.loginApiURL + 'signin', userData).pipe(
      catchError((error) => {
        if (error.status == 404) {
          this.statusMessageService.showStatusMessage('Falsche E-Mail-Adresse oder falsches Passwort', 'error')
        } else {
          this.statusMessageService.showStatusMessage('Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!', 'error');
        }
        return throwError(() => 'Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!');
      })
    );
  }

  private _signupApiCall(data: SignupData): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.loginApiURL + 'signup', data).pipe(
      catchError((error) => {
        if (error.status == 409) {
          this.statusMessageService.showStatusMessage('Diese Email existiert bereits', 'error')
        } else {
          this.statusMessageService.showStatusMessage('Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!', 'error');
        }
        return throwError(() => 'Es gab einen Fehler. Bitte versuche es in ein paar Minuten nochmal!');
      })
    );
  }
}
