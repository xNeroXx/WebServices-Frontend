import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SongData} from "../../interfaces/song-data";
import {SongService} from "../../services/song.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit{

  selectedSong: SongData | null = null;
  audioPlayer: HTMLAudioElement | null = null;
  selectedSongId: number | null = null;
  isPlaying = false;



  constructor(private searchService: SearchService, private songService: SongService) {}

  ngOnInit() {}

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

  get searchResults() {
    return this.searchService.searchResponse;
  }

}
