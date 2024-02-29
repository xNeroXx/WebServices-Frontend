import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private apiURL = ""; //TODO

  constructor(private http: HttpClient) {
  }

  requestLogin(userData: { [key: string]: string }): Observable<string> {
    return this.http.post<any>(this.apiURL + "/Login", userData).pipe(
      map(response => {
        if (response && response.access_token) {
          return response.access_token;
        } else {
          throw new Error('Ungültige Antwortformat');
        }
      })
    );
  }
}
