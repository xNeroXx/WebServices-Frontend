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
  songs: SongData[] = [];
  selectedSong: SongData | null = null;
  @ViewChild(AudioPlayerComponent) audioPlayerComponent!: AudioPlayerComponent;
  audioUrl: string | undefined;
  currentPlayingSongId: number | null = null;
  audioPlayer: HTMLAudioElement | null = null;
  selectedSongId: number | null = null;
  isPlaying = false;

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

  playSong(songId: number): void {
    if (this.selectedSongId === songId && this.isPlaying) {
      // Wenn der angeklickte Song bereits abgespielt wird, pausiere ihn
      this.isPlaying = false;
      if (this.audioPlayer) {
        this.audioPlayer.pause(); // Pausiere die Audiowiedergabe
      }
      this.selectedSongId = null;
    } else {
      // Wenn ein neuer Song angeklickt wird, spiele ihn ab
      if (this.audioPlayer) {
        this.audioPlayer.pause(); // Pausiere die aktuelle Audiowiedergabe
      }
      this.songService.getAudioSource(songId).subscribe(
        (blob: Blob) => {
          const audioUrl = URL.createObjectURL(blob);
          this.audioPlayer = new Audio(audioUrl);
          this.isPlaying = true;
          this.selectedSongId = songId;
          this.audioPlayer.play();
        },
        (error: any) => {
          console.error('Fehler beim Abrufen der Audiodatei:', error);
        }
      );
    }
  }


  pauseSong(): void {
    if (this.audioPlayer) {
      this.audioPlayer.pause(); // Pausiere die Audiowiedergabe
      this.isPlaying = false; // Setze den Abspielstatus auf false
    }
  }

}

