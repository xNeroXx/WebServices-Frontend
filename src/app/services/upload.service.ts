import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  async uploadFile(file: File): Promise<number> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.http.post<any>('https://jsonplaceholder.typicode.com/posts', formData).toPromise();

    return response.id;
  }

  async getFileDetails(fileId: number): Promise<any> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${fileId}`).toPromise();
  }
}
