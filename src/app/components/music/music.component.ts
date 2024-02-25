import { Component } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {
  label = '../../../assets/img/music-card-banner.jpg';
  //TODO call all songs from the backend
  //for now just example songs
  songs: { title: string, artist: string, imageUrl: string, audioSrc: string }[] = [
    { title: 'Song 1', artist: 'Artist 1', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Song 2', artist: 'Artist 2', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { title: 'Song 3', artist: 'Artist 3', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { title: 'Song 4', artist: 'Artist 4', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { title: 'Song 5', artist: 'Artist 5', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { title: 'Song 6', artist: 'Artist 6', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { title: 'Song 7', artist: 'Artist 7', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { title: 'Song 8', artist: 'Artist 8', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { title: 'Song 9', artist: 'Artist 9', imageUrl: this.label, audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  ];
  selectedAudioSrc: string | null = null;
  isPlaying: boolean = false;

  playSong(audioSrc: string) {
    if (this.selectedAudioSrc === audioSrc) {
      this.isPlaying = !this.isPlaying;
      this.selectedAudioSrc = null;
    } else {
      this.selectedAudioSrc = audioSrc;
      this.isPlaying = true;
    }
  }
}
