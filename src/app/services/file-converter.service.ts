import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileConverterService {

  constructor(private http: HttpClient) {}

  convertSong(song: { title: string, artist: string, imageUrl: string, audioSrc: string }): Observable<any> {
    const url = 'http://localhost:8000/convert'; //TODO actual endpoint for convert
    return this.http.post(url, song);
  }
}

