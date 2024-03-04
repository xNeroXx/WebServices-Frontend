import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenObject} from "../interfaces/token-object";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private refreshURL = 'http://127.0.0.1:8000/api/registration/auth/refresh'

  constructor(private http: HttpClient) {
  }

  refreshToken() {
    return this.http.post<TokenObject>(this.refreshURL, {}).subscribe((data) => {
      localStorage.clear();
      localStorage.setItem("access_token", data.token.access_token);
      localStorage.setItem("refresh_token", data.token.refresh_token);
    })
  }
}
