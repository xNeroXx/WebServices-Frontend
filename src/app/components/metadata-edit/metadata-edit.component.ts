import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MetadataService} from '../../services/metadata.service';

@Component({
  selector: 'app-metadata-edit',
  templateUrl: './metadata-edit.component.html',
  styleUrls: ['./metadata-edit.component.scss']
})
export class MetadataEditComponent {

  constructor(
    public dialogRef: MatDialogRef<MetadataEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private metadataService: MetadataService
  ) {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.metadataService.updateMetadata(this.data.song).subscribe(() => {
      console.log('Metadata updated successfully');
      this.dialogRef.close();
    }, (error: any) => {
      console.error('Error updating metadata:', error);
    });
  }

}
