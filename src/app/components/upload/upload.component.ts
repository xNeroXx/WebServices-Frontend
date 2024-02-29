import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | undefined;
  accessToken: string | null = null;
  errorMessage: string | null = null;


  constructor(
    private uploadService: UploadService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.accessToken = localStorage.getItem('access_token');
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile && this.accessToken) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        (response: any) => {
          console.log('Upload successful:', response);
          this.errorMessage = null;
        },
        (error: any) => {
          console.error('Upload failed:', error);
          this.errorMessage = error;
        }
      );
    }
  }
}
