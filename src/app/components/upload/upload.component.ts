import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatPrefix} from "@angular/material/form-field";
import {UploadService} from "../../services/upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StatusMessageService} from "../../services/status-message.service";

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule, MatPrefix],
})
export class UploadComponent implements OnInit{
  private selectedFiles?: FileList;
  private currentFile?: File;
  private progress = 0;
  private message = '';

  private fileInfos?: Observable<any>;
  constructor(private uploadService: UploadService, private statusMessageService: StatusMessageService) {}

  ngOnInit() {

  }

  upload(): void {
    this.progress = 0;
    this.statusMessageService.showStatusMessage('ChangeEvent fired')
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event instanceof HttpResponse) {
              this.message = event.body.message;
              console.log(event.body.message)
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
              this.statusMessageService.showStatusMessage('Ein Fehler ist aufgetreten: ' + err.error.message, 'error');
            } else {
              this.statusMessageService.showStatusMessage('Datei konnte nicht hochgeladen werden');
            }

            this.currentFile = undefined;
          },
          complete: () => {
            console.log('Upload complete')
            this.statusMessageService.showStatusMessage('Upload erfolgreich!', 'affirmative')
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;

    this.upload();
  }

  foo() {
    this.uploadService.foobar()
  }
}
