import {Component} from '@angular/core';
import {UploadService} from '../../services/upload.service';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule, MatProgressBar, NgIf],
})
export class UploadComponent {
  fileName: string = '';
  progress: number = 0;

  constructor(private fileUploadService: UploadService) { }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;

    const fileId = await this.fileUploadService.uploadFile(file);

    // Reset progress and file name after successful upload
    this.progress = 0;
    this.fileName = '';
  }
}

