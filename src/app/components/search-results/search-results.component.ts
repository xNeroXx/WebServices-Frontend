import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SongData} from "../../interfaces/song-data";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  private searchResults: SongData[] = []

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchResults = this.searchService.searchResponse;
  }

}
