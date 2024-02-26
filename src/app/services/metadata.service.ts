import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  private apiUrl = 'https://example.com/api/metadata'; //TODO api call

  constructor(private http: HttpClient) { }

  updateMetadata(metadata: any): Observable<any> {
    const url = `${this.apiUrl}/${metadata.id}`; //TODO api call with id of metadata
    return this.http.put(url, metadata)
      .pipe(
        catchError(error => {
          throw 'Error updating metadata: ' + error;
        })
      );
  }
}
