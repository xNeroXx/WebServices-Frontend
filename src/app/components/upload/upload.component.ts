import {Component, inject} from '@angular/core';
import {UploadService} from '../../services/upload.service';
import {StatusMessageService} from "../../services/status-message.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | undefined;
  statusMessageService: StatusMessageService = inject(StatusMessageService);

  constructor(
    private uploadService: UploadService) {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        () => {
          this.statusMessageService.showStatusMessage('Die Datei wurde erfolgreich hochgeladen.', 'success');
          this.selectedFile = undefined;
        },
        (error: any) => {
          if (error.status === 409) {
            this.selectedFile = undefined;
            return this.statusMessageService.showStatusMessage('Die Datei existiert bereits.', 'error');
          } else if (error.status === 422) {
            this.selectedFile = undefined;
            return this.statusMessageService.showStatusMessage('Die Datei konnte nicht verarbeitet werden, da sie keine ID3-Tags enthält.', 'error');
          } else {
            this.selectedFile = undefined;
            return this.statusMessageService.showStatusMessage('Ein unbekannter Fehler ist aufgetreten. Versuchen Sie es später nochmal.', 'error');
          }
        })
    }
  }

  get validFile() {
    if (this.selectedFile?.name) {
      return /\.mp3$/.test(this.selectedFile?.name)
    } else {
      return false;
    }
  }
}
