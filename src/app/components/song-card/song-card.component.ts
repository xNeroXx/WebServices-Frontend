import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MetadataEditComponent} from "../metadata-edit/metadata-edit.component";
import {FileConverterComponent} from "../file-converter/file-converter.component";
import {SongData} from "../../interfaces/song-data";
import {DeleteService} from "../../services/delete.service";
import {StatusMessageService} from "../../services/status-message.service";

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
  @Output() deleteSong: EventEmitter<number> = new EventEmitter<number>();
  deletingSong: boolean = false;
  deleteSuccess: boolean = false;
  loading: boolean = false;


  constructor(private dialog: MatDialog,
              private deleteService: DeleteService,
              private statusMessageService: StatusMessageService) {
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause.emit(); // Emit a pause event
    } else {
      this.play.emit(this.song.song_id);
    }
  }

  openConversionDialog(file_id: number): void {
    this.dialog.open(FileConverterComponent, {
      width: '600px',
      data: {
        fileId: file_id,
      }
    });
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

  onDeleteSong(songId: number) {
    this.deleteService.deleteSong(this.song.song_id).subscribe(
      () => {
        this.statusMessageService.showStatusMessage('Song erfolgreich gelöscht');
        window.location.reload();
      },
      (error) => {
        this.statusMessageService.showStatusMessage('Fehler beim Löschen des Songs: ' + error, 'error');
      }
    );
  }

}
