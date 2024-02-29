import {Component, OnInit} from "@angular/core";
import {SongService} from "../../services/song.service";
import {SongData} from "../../interfaces/song-data";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  songs: SongData[] = [];
  selectedSong: SongData | null = null;
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
      this.isPlaying = false;
      if (this.audioPlayer) {
        this.audioPlayer.pause();
      }
      this.selectedSongId = null;
    } else {
      if (this.audioPlayer) {
        this.audioPlayer.pause();
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
      this.audioPlayer.pause();
      this.isPlaying = false;
    }
  }

}

