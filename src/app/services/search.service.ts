import { Injectable } from '@angular/core';
import {delay, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SongData} from "../interfaces/song-data";
import {Router, RouterModule} from "@angular/router";
import {StatusMessageService} from "./status-message.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchURL = 'http://example-url.de/search/'

  categorySearchAutofillData: {[category: string]: string[]} = {
    'title': [
      "Bohemian Rhapsody",
      "Like a Rolling Stone",
      "Billie Jean",
      "Imagine",
      "Hey Jude",
      "Hotel California",
      "Smells Like Teen Spirit",
      "Sweet Child o' Mine",
      "Wonderwall",
      "Every Breath You Take",
      "Thriller",
      "Yesterday",
      "Stairway to Heaven",
      "Let It Be",
      "Don't Stop Believin'",
      "I Will Always Love You",
      "Born to Run",
      "Piano Man",
      "My Way",
      "Free Bird"
    ],
    'artists': [
      "Queen",
      "The Beatles",
      "Michael Jackson",
      "Madonna",
      "Elvis Presley",
      "Bob Dylan",
      "Beyoncé",
      "Led Zeppelin",
      "Adele",
      "Pink Floyd",
      "David Bowie",
      "Prince",
      "Frank Sinatra",
      "Rolling Stones",
      "Whitney Houston",
      "Taylor Swift",
      "Bruno Mars",
      "Nirvana",
      "Eminem",
      "Metallica"
    ],
    'album': [
      "Abbey Road",
      "The Dark Side of the Moon",
      "Thriller",
      "Led Zeppelin IV",
      "The Wall",
      "The Beatles (White Album)",
      "Sgt. Pepper's Lonely Hearts Club Band",
      "Back in Black",
      "Born to Run",
      "Rumours",
      "Nevermind",
      "Greatest Hits",
      "The Joshua Tree",
      "Purple Rain",
      "Greatest Hits",
      "Hotel California",
      "A Night at the Opera",
      "Revolver",
      "Legend",
      "Goodbye Yellow Brick Road"
    ],
    'genre': [
      "Rock",
      "Pop",
      "R&B",
      "Hip Hop",
      "Country",
      "Jazz",
      "Blues",
      "Electronic",
      "Folk",
      "Reggae",
      "Classical",
      "Punk",
      "Metal",
      "Indie",
      "Soul",
      "Funk",
      "Alternative",
      "Disco",
      "Gospel",
      "Techno"
    ]
  };
  filteredCategorySearchAutofillData: string[] = [];
  categorySearchResults: string[] = []; //same as filteredCategorySearchAutofillData, but only updated on submit of search form
  searchResponse: SongData[] = [];
  searchValue: string = '';
  searchCategory: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  getAutoCompleteData(): Observable<{[category: string]: string[]}> {
    return this.http.get<{[category: string]: string[]}>(this.searchURL + 'getStringArray');
  }

  search(searchValue: string, searchCategory: string) {
    console.log('cat ' + searchCategory + ' | val ' + searchValue);
    this.searchValue = searchValue;
    this.searchCategory = searchCategory;
    const lowerCaseSearchValue = searchValue.toLowerCase();
    if (searchCategory == 'title') {
      this._searchForSongs(searchValue, searchCategory);
      console.log("1");
    } else {
      if (this.categorySearchResults.some(result => result.toLowerCase() === lowerCaseSearchValue)) {
        console.log("2");
        this._searchForSongs(searchValue, searchCategory);
      }
      else {
        this._preSearchCategory();
      }

    }
  }

  private _searchForSongs(searchValue: string, searchCategory: string) {
    this.http.post<SongData[]>(this.searchURL, {searchCategory: searchValue}).subscribe( //TODO research errorhandling thats not deprecated
      (data) => {
        this.searchResponse = data;
        this.router.navigate(['/searchResults']);
      });
  }

  private _preSearchCategory() {
    this.router.navigate(['/presearch']);
    console.log(this.filteredCategorySearchAutofillData)
  }

  getFilteredCategorySearchData(category: string, filterValue: string): string[] {
    this.filteredCategorySearchAutofillData = this.categorySearchAutofillData[category].filter(option => option.toLowerCase().includes(filterValue));
    return this.filteredCategorySearchAutofillData;
  }


}
