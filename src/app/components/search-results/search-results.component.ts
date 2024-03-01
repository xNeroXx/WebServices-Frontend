import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SongData} from "../../interfaces/song-data";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit{
  protected searchResults: SongData[] = [];
  protected selectedAudioSrc: string | null = null;
  private isPlaying: boolean = false;

  audioSrc = ''


  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchResults = this.searchService.searchResponse;
  }

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
