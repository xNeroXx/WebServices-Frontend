import {Component, Inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {DialogService} from '../../services/dialog.service';
import {FileConverterService} from '../../services/file-converter.service';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

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
      console.error('Bitte wählen Sie das Zielformat aus.');
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
        error => {
          console.error('Fehler bei der Konvertierung:', error);
        }
      );
  }


  cancel(): void {
    this.closeDialog();
    console.log('Konvertierung abgebrochen');
  }
}
