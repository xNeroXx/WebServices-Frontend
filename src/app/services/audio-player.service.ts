import {Injectable, PLATFORM_ID, Inject} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private _isPlaying = new BehaviorSubject<boolean>(false);
  isPlaying$ = this._isPlaying.asObservable();
  private _currentSong = new BehaviorSubject<string | null>(null);
  currentSong$ = this._currentSong.asObservable();

  private audioPlayer: HTMLAudioElement | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.audioPlayer = new Audio();
    }
  }

  setPlayingState(isPlaying: boolean, currentSong: string | null) {
    this._isPlaying.next(isPlaying);
    this._currentSong.next(currentSong);
  }

  play(audioSrc: string) {
    if (this.audioPlayer) {
      this.audioPlayer.src = audioSrc;
      this.audioPlayer.play();
      this.setPlayingState(true, audioSrc);
    }
  }


  pause() {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.setPlayingState(false, null);
    }
  }

  togglePlay(song_id: number) {
  /*  if (this._isPlaying.value && this._currentSong.value) { // === audioSrc) {
      this.pause();
    } else { */
   //   this.play(song_id);
   // }
  }
}


