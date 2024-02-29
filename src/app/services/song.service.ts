import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {SongData} from "../interfaces/song-data";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private searchURL = 'http://localhost:8000/api/search/search/combined';
  private apiUrl = 'http://localhost:8000/api/crud/file';

  constructor(private http: HttpClient) {
  }

  getAllSongs(): Observable<SongData[]> {
    return this.http.post<SongData[]>(this.searchURL, {}).pipe(
      catchError(this.handleError)
    );
  }

  getAudioSource(songId: number): Observable<Blob> {
    const url = `${this.apiUrl}/${songId}`;
    return this.http.get(url, {responseType: 'blob'});
  }

  private handleError(error: any): Observable<never> {
    console.error('Fehler aufgetreten:', error);
    throw error;
  }
}
