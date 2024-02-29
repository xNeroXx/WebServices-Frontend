import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  private apiUrl = "http://localhost:8000/api/crud/delete_song_and_file";

  constructor(private http: HttpClient) {
  }

  ///${this.apiUrl}
  deleteSong(songId: number): Observable<any> {
    const url = `${this.apiUrl}/${songId}`;
    return this.http.delete(url);
  }
}
