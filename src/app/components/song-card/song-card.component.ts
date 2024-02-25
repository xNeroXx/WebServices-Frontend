import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AudioPlayerService} from '../../services/audio-player.service';

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

  constructor(private audioPlayerService: AudioPlayerService) {
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
      // this.play.emit(this.song.audioSrc);
    }
  }
}
