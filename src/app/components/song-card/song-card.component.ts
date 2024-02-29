import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MetadataEditComponent} from "../metadata-edit/metadata-edit.component";
import {FileConverterComponent} from "../file-converter/file-converter.component";
import {SongData} from "../../interfaces/song-data";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent {
  @Input() song: SongData = {} as SongData;
  @Input() isSelected: boolean = false;
  @Input() isPlaying: boolean = false;
  @Output() play = new EventEmitter<number>();
  @Output() pause = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause.emit(); // Emit a pause event
    } else {
      this.play.emit(this.song.song_id);
    }
  }

  openMetadataEditDialog(): void {
    const dialogRef = this.dialog.open(MetadataEditComponent, {
      width: '600px',
      data: {song: this.song}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openConversionDialog(file_id: number): void {
    this.dialog.open(FileConverterComponent, {
      width: '600px',
      data: {
        fileId: file_id,
      }
    });
  }

}
