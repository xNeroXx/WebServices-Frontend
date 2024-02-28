import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FileConverterService {
  private apiUrl = 'http://localhost:8000/api/encoderservice/convertfile/';

  constructor(private http: HttpClient) { }

  convertFile(fileId: number, targetFormat: string): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/octet-stream');
    return this.http.post(`${this.apiUrl}${fileId}?target_format=${targetFormat}`, { target_format: targetFormat }, { headers: headers, responseType: 'blob' });
  }
}
