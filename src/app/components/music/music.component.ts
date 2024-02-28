import {Component, Input, OnInit} from "@angular/core";
import {SongService} from "../../services/song.service";
import {SongData} from "../../interfaces/song-data";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  songs: SongData[] = [];
  @Input() song_id: number | undefined;
  audioUrl: string | undefined;
  selectedAudioSrc: string | null = null;
  isPlaying: boolean = false;

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.loadSongs();

  }

  loadSongs(): void {
    this.songService.getAllSongs().subscribe(
      (data: any[]) => {
        this.songs = data;
      },
   /**   (error) => {
        console.error("Failed to load songs:", error);
      }  */
    );
  }

  playSong(song_id: number) {
    console.log('Playing song with id:', song_id);
    this.songService.getAudioSource(song_id).subscribe((response: Blob) => {
      this.audioUrl = URL.createObjectURL(response);
    });

  /**  if (this.selectedAudioSrc === audioSrc) {
      this.isPlaying = !this.isPlaying;
    } else {
      this.selectedAudioSrc = audioSrc;
      this.isPlaying = true;
    } */
  }
}
