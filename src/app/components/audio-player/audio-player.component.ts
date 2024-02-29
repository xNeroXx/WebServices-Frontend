import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnChanges {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef;
  @Input() isPlaying: boolean = false;
  @Input() audioSrc: string | undefined;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  /**  if (changes['audioSrc'] && !changes['audioSrc'].firstChange) {
      this.loadAudio();
    } */

    if (changes['isPlaying'] && !changes['isPlaying'].firstChange) {
      if (this.isPlaying) {
       // this.play();
      } else {
       // this.pause();
      }
    }
  }

  /**
  loadAudio() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.src = this.audioSrc || '';
    audioPlayer.load();
  } */

  /**
  play() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.play();
  }

  pause() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.pause();
  } */
}
