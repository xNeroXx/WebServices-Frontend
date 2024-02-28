import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AudioPlayerService} from '../../services/audio-player.service';
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
  @Input() song: any;
  @Input() audioFile: File | undefined;
  @Input() isPlaying: boolean = false;
  @Output() play = new EventEmitter<number>();

  constructor(private audioPlayerService: AudioPlayerService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.audioPlayerService.isPlaying$.subscribe(isPlaying => {
      this.audioPlayerService.currentSong$.subscribe(currentSong => {
        this.isPlaying = isPlaying //&& this.song! === currentSong;
      });
    });
  }

  togglePlay() {

      this.audioPlayerService.togglePlay(this.song.id);
      this.isPlaying = true;
      console.log(this.song);

    //this.isPlaying = false;

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
