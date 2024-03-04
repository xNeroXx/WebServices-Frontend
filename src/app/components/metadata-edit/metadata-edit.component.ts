import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MetadataService} from '../../services/metadata.service';
import {StatusMessageService} from "../../services/status-message.service";

@Component({
  selector: 'app-metadata-edit',
  templateUrl: './metadata-edit.component.html',
  styleUrls: ['./metadata-edit.component.scss']
})
export class MetadataEditComponent {
  selectedArtistNames: string;
  loading = false;
  statusMessageService: StatusMessageService = inject(StatusMessageService);

  constructor(
    public dialogRef: MatDialogRef<MetadataEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private metadataService: MetadataService
  ) {
    this.selectedArtistNames = data.song.artists.map((artist: { name: string; }) => artist.name).join('; ');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    const artistNames = this.selectedArtistNames.split(';').map(name => name.trim());

    this.data.song.artists = artistNames.map(name => ({name: name}));
    this.metadataService.changeMetadata(this.data.song).subscribe(() => {
      this.loading = true;
      this.statusMessageService.showStatusMessage('Daten erfolgreich aktualisiert', 'success');
      this.dialogRef.close();
    }, (error: any) => {
      this.loading = false;
      if (error.status === 422) {
        return this.statusMessageService.showStatusMessage('Bitte geben Sie valide Werte ein.', 'error');
      } else {
        return this.statusMessageService.showStatusMessage('Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später nochmal.', 'error');
      }
    });
  }
}
