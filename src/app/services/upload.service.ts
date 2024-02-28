import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {SongData} from "../interfaces/song-data";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadURL = 'http://127.0.0.1:8000/api/id3service/uploadfile';
  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<HttpEvent<any>>(this.uploadURL, formData, {responseType: 'json'});
  }

  foobar() {
    this.http.post<Observable<SongData>>('http://127.0.0.1:8000/api/encoderservice/convertfile/2', {'title': 'lo'}).subscribe((data) => {console.log(data)})
  }
}
