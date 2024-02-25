import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-file-converter',
  templateUrl: './file-converter.component.html',
  styleUrls: ['./file-converter.component.scss']
})
export class FileConverterComponent {

  constructor(
    private dialogService: DialogService,
  ) {}

  openFileSelectionDialog(): void {
  /**  const dialogRef = this.dialogService.openDialog({
      title: 'Select File to Convert',
      content: 'Here goes the content of the dialog. You can list the available files here.',
    });

    dialogRef.afterClosed().subscribe((selectedFile: File) => {
      if (selectedFile) {
        this.convertFile(selectedFile);
      }
    });*/
  }

  convertFile(file: File): void {

  }
}
