import {Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import { AudioPlayerService } from '../../services/audio-player.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent {
  @Input() audioSrc: string = '';
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef;
  @Input() isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 100;
  isMuted: boolean = false;


  constructor(private audioPlayerService: AudioPlayerService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isPlaying'] && !changes['isPlaying'].firstChange) {
      if (this.isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.muted = this.isMuted;
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.audioPlayerService.setPlayingState(this.isPlaying, this.audioSrc);


    /**
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    } */
  }

  play() {
    this.audioPlayerRef.nativeElement.play();
    this.isPlaying = true;
  }

  pause() {
    this.audioPlayerRef.nativeElement.pause();
    this.isPlaying = false;
  }

  adjustVolume() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.volume = this.volume / 100;
  }

  seek(event
         :
         MouseEvent
  ) {
    const progressBar = event.target as HTMLDivElement;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const width = progressBar.offsetWidth;
    this.audioPlayerRef.nativeElement.currentTime = (clickX / width) * this.duration;
  }

  /**
  ngAfterViewInit() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.addEventListener('canplaythrough', () => this.play());
    audioPlayer.addEventListener('timeupdate', () => {
      this.currentTime = audioPlayer.currentTime;
      this.duration = audioPlayer.duration;
    });
    audioPlayer.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  } */
}

