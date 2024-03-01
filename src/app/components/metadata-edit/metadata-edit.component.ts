import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MetadataService} from '../../services/metadata.service';

@Component({
  selector: 'app-metadata-edit',
  templateUrl: './metadata-edit.component.html',
  styleUrls: ['./metadata-edit.component.scss']
})
export class MetadataEditComponent {
  selectedArtistNames: string;
  loading = false;

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
    this.loading = true;
    this.metadataService.changeMetadata(this.data.song).subscribe(() => {
      this.dialogRef.close();
    }, (error: any) => {
      console.error('Error updating metadata:', error);
    });
  }
}
