import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:8000/api/id3service/uploadfile';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError('Die Datei existiert bereits.');
        } else if (error.status === 422) {
          return throwError('Die Datei konnte nicht verarbeitet werden, da sie keine ID3-Tags enthält.');
        }
        else {
          return throwError('Ein unbekannter Fehler ist aufgetreten.');
        }
      })
    );
  }
}

