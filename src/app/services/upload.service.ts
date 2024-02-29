import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:8000/api/id3service/uploadfile';

  constructor(private http: HttpClient) {
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('access_token');

    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError((error: any) => {
        console.error('Upload failed:', error);
        return throwError('Upload failed');
      })
    );
  }
}
