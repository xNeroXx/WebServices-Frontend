import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SongData} from "../interfaces/song-data";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  private apiUrl = 'http://localhost:8000/api/id3service/change-metadata';

  constructor(private http: HttpClient) {
  }

  changeMetadata(song: SongData): Observable<string> {
    return this.http.post(this.apiUrl, song, {responseType: 'text'});
  }
}
