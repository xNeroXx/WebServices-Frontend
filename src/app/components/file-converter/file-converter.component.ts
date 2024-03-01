import {Component, inject, Inject, Input} from '@angular/core';
import {DialogService} from '../../services/dialog.service';
import {FileConverterService} from '../../services/file-converter.service';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {StatusMessageService} from "../../services/status-message.service";

@Component({
  selector: 'app-file-converter',
  templateUrl: './file-converter.component.html',
  styleUrls: ['./file-converter.component.scss']
})
export class FileConverterComponent {
  @Input() audioSrc: string = '';
  loading: boolean = false;
  availableFormats: string[] = ['ogg', 'wav', 'flac'];
  selectedFormat: string = '';
  fileId: number;
  statusMessageService: StatusMessageService = inject(StatusMessageService);


  constructor(
    private dialogService: DialogService,
    private fileConverterService: FileConverterService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fileId = data.fileId;
  }

  closeDialog(): void {
    this.dialogService.closeDialog();
  }

  convert(): void {
    if (!this.selectedFormat) {
      this.statusMessageService.showStatusMessage('Bitte wählen Sie die Zielkonvertierung aus.', 'error');
      return;
    }
    this.loading = true;
    this.fileConverterService.convertFile(this.fileId, this.selectedFormat)
      .subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'konvertierte_datei.' + this.selectedFormat;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          this.loading = false;
          this.closeDialog();
        },
        () => {
          return this.statusMessageService.showStatusMessage('Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später nochmal.', 'error');
        }
      );
  }


  cancel(): void {
    this.closeDialog();
    console.log('Konvertierung abgebrochen');
  }
}
