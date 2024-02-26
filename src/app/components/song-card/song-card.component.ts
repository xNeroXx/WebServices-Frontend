import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AudioPlayerService} from '../../services/audio-player.service';
import {MatDialog} from "@angular/material/dialog";
import {MetadataEditComponent} from "../metadata-edit/metadata-edit.component";
import {FileConverterComponent} from "../file-converter/file-converter.component";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent {

  @Input() song: { title: string, artist: string, imageUrl: string, audioSrc: string } = {
    title: '',
    artist: '',
    imageUrl: '',
    audioSrc: ''
  };
  @Input() isPlaying: boolean = false;
  @Output() play = new EventEmitter<string>();

  constructor(private audioPlayerService: AudioPlayerService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.audioPlayerService.isPlaying$.subscribe(isPlaying => {
      this.audioPlayerService.currentSong$.subscribe(currentSong => {
        this.isPlaying = isPlaying && this.song.audioSrc === currentSong;
      });
    });
  }

  togglePlay() {
    if (this.song) {
      this.audioPlayerService.togglePlay(this.song.audioSrc);
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

  openConversionDialog(): void {
    this.dialog.open(FileConverterComponent, {
      width: '600px',
      data: {
        audioSrc: this.song.audioSrc // Pass the audio source to the converter component
      }
    });
  }

}
