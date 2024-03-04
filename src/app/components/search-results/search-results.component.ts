import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SongData} from "../../interfaces/song-data";
import {SongService} from "../../services/song.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  selectedSong: SongData | null = null;
  audioContext: AudioContext | null = null;
  selectedSongId: number | null = null;
  audioBuffer: AudioBuffer | null = null;
  audioSourceNode: AudioBufferSourceNode | null = null;
  isPlaying = false;

  constructor(private searchService: SearchService, private songService: SongService) {
  }

  get searchResults() {
    return this.searchService.searchResponse;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.audioContext = new AudioContext();
    } catch (error) {
      console.error("Failed to initialize AudioContext:", error);
    }
  }

  ngOnDestroy(): void {
    this.pauseSong();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  async playSong(songId: number): Promise<void> {
    if (this.selectedSongId === songId && this.isPlaying) {
      this.isPlaying = false;
      if (this.audioSourceNode) {
        this.audioSourceNode.stop();
      }
      this.selectedSongId = null;
    } else {
      if (this.audioSourceNode) {
        this.audioSourceNode.stop();
      }
      try {
        const audioBlob = await this.songService.getAudioSource(songId).toPromise();
        if (audioBlob) {
          const arrayBuffer = await audioBlob.arrayBuffer();
          this.audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
          this.audioSourceNode = this.audioContext!.createBufferSource();
          this.audioSourceNode.buffer = this.audioBuffer;
          this.audioSourceNode.connect(this.audioContext!.destination);
          this.audioSourceNode.start();
          this.isPlaying = true;
          this.selectedSongId = songId;
        } else {
          console.error('Failed to retrieve audio data: Blob is undefined');
        }
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  }

  pauseSong(): void {
    if (this.audioSourceNode) {
      this.audioSourceNode.stop();
      this.isPlaying = false;
    }
  }
}
