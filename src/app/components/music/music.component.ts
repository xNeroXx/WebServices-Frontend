import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {SongService} from "../../services/song.service";
import {SongData} from "../../interfaces/song-data";
import {log} from "node:util";
import {AudioPlayerComponent} from "../audio-player/audio-player.component";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  songs: any;
  selectedSong: SongData | null = null;
  // @ViewChild('audioPlayer') audioPlayerRef!: ElementRef;
  @ViewChild(AudioPlayerComponent) audioPlayerComponent!: AudioPlayerComponent;
  audioSrc: string | undefined;
 // @Input() song_id: number | undefined;
  //audioUrl: string | undefined;
 // selectedAudioSrc: string | null = null;
  isPlaying: boolean = false;

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.loadSongs();

  }

  loadSongs(): void {
    this.songService.getAllSongs().subscribe(
      (data: SongData[]) => {
        this.songs = data;
        console.log('Songs:', this.songs)
      },
      (error) => {
        console.error("Failed to load songs:", error);
      }
    );

  }

  playSong(songId: number) {
    this.songService.getAudioSource(songId).subscribe(
      (blob: Blob) => {
        const audioUrl = URL.createObjectURL(blob);
        const audioPlayer = new Audio(audioUrl);
        audioPlayer.play();
      },
      (error: any) => {
        console.error('Fehler beim Abrufen der Audiodatei:', error);
      }
    );
  }

/**
  playSong(song: SongData) {
    this.selectedSong = song;
    this.isPlaying = true;
  } */
  /**
  playSong(song_id: number) {
    console.log('Playing song with id:', song_id);
    this.songService.getAudioSource(song_id).subscribe((response: Blob) => {
      this.audioUrl = URL.createObjectURL(response);
    });
    if (this.selectedAudioSrc === this.audioUrl) {
      this.isPlaying = !this.isPlaying;
    } else {
      // this.selectedAudioSrc = audioUrl;
      this.isPlaying = true;
    }
  } */
}
