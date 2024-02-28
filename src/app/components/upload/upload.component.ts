import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import {isPlatformBrowser, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  standalone: true,
  imports: [
    MatIcon,
    MatFabButton,
    NgIf,
    MatButton
  ],
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | undefined;
  accessToken: string | null = null;

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
          // Handle successful upload response
        },
        (error: any) => {
          console.error('Upload failed:', error);
          // Handle upload error
        }
      );
    }
  }
}
