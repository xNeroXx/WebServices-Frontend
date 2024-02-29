import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MetadataService} from '../../services/metadata.service';

@Component({
  selector: 'app-metadata-edit',
  templateUrl: './metadata-edit.component.html',
  styleUrls: ['./metadata-edit.component.scss']
})
export class MetadataEditComponent {
  selectedArtistName: string;


  constructor(
    public dialogRef: MatDialogRef<MetadataEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private metadataService: MetadataService
  ) {
    this.selectedArtistName = data.song.artist[0].name;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.metadataService.changeMetadata(this.data.song).subscribe(() => {
      this.dialogRef.close();
    }, (error: any) => {
      console.error('Error updating metadata:', error);
    });
  }
}
