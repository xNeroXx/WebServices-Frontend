import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetadataService } from '../../services/metadata.service';
import { StatusMessageService } from "../../services/status-message.service";
import { UpdatedSongData } from "../../interfaces/update-song-data";

@Component({
  selector: 'app-metadata-edit',
  templateUrl: './metadata-edit.component.html',
  styleUrls: ['./metadata-edit.component.scss']
})
export class MetadataEditComponent {
  selectedArtistNames: string;
  loading = false;
  statusMessageService: StatusMessageService;

  constructor(
    public dialogRef: MatDialogRef<MetadataEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private metadataService: MetadataService,
    statusMessageService: StatusMessageService
  ) {
    this.statusMessageService = statusMessageService;
    this.selectedArtistNames = this.extractArtistNames(data.song.artists);
  }

  extractArtistNames(artists: { name: string }[]): string {
    return artists.map(artist => artist.name).join('; ');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    const updatedSongData: UpdatedSongData = {
      song_id: this.data.song.song_id
    };

    if (
      !this.data.song.title &&
      !this.data.song.album &&
      !this.data.song.genre &&
      !this.data.song.release_date
    ) {
      this.dialogRef.close();
      return;
    }

    const artistNames = this.selectedArtistNames.split(';').map(name => name.trim());

    const validArtists = artistNames.filter(name => name !== '');
    if (validArtists.length > 0) {
      updatedSongData.artists = validArtists.map(name => ({ name: name }));
    }

    if (this.data.song.title) {
      updatedSongData.title = this.data.song.title;
    }
    if (this.data.song.album) {
      updatedSongData.album = this.data.song.album;
    }
    if (this.data.song.genre) {
      updatedSongData.genre = this.data.song.genre;
    }
    if (this.data.song.release_date) {
      updatedSongData.date = this.data.song.release_date;
    }

    this.metadataService.changeMetadata(updatedSongData).subscribe(
      () => {
        this.loading = true;
        this.statusMessageService.showStatusMessage('Daten erfolgreich aktualisiert', 'affirmative');
        this.data.song.artists = updatedSongData.artists || [];
        this.selectedArtistNames = this.extractArtistNames(this.data.song.artists);
        this.dialogRef.close();
      },
      (error: any) => {
        this.loading = false;
        if (error.status === 422) {
          this.statusMessageService.showStatusMessage('Bitte geben Sie valide Werte ein.', 'error');
        } else {
          this.statusMessageService.showStatusMessage('Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später nochmal.', 'error');
        }
      }
    );
  }
}
