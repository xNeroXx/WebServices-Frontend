import { Component, Input } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-file-converter',
  templateUrl: './file-converter.component.html',
  styleUrls: ['./file-converter.component.scss']
})
export class FileConverterComponent {
  @Input() audioSrc: string = '';

  currentFormat: string = '';
  availableFormats: string[] = ['MP3', 'WAV', 'FLAC']; //TODO get all available fromats from backend
  selectedFormat: string = '';

  constructor(private dialogService: DialogService) {}

 // TODO get audio type from backend

  closeDialog(): void {
    this.dialogService.closeDialog();
  }

  convert(): void {
    console.log('Konvertierung gestartet:', this.selectedFormat);
    this.closeDialog();
  }

  cancel(): void {
    this.closeDialog();
    console.log('Konvertierung abgebrochen');
  }
}
