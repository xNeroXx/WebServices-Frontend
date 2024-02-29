import {Component} from '@angular/core';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  fileName: string = '';
  progress: number = 0;

  constructor(private uploadService: UploadService) {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;

    this.uploadService.uploadFile(file).subscribe(
      (progress: number) => {
        this.progress = progress;
        if (progress === 100) {
          // Reset file selection and progress after successful upload
          this.fileName = '';
          setTimeout(() => {
            this.progress = 0;
          }, 2000); // Set timeout to reset progress after 2 seconds
        }
      },
      (error: any) => {
        console.error('Upload failed:', error);
        // Handle upload error
      }
    );
  }
}
