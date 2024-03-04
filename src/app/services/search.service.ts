import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createSongData, SongData} from "../interfaces/song-data";
import {Router} from "@angular/router";
import {AutofillData, createAutofillData} from "../interfaces/autofill-data";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  categorySearchAutofillData: AutofillData = createAutofillData();
  filteredCategorySearchAutofillData: string[] = [];
  categorySearchResults: string[] = []; //same as filteredCategorySearchAutofillData, but only updated on submit of search form
  searchResponse: SongData[] = [];
  searchValue: string = '';
  searchCategory: string = '';
  private searchURL = 'http://127.0.0.1:8000/api/search/search/'

  constructor(private http: HttpClient, private router: Router) {
  }

  getAutoCompleteData() {
    this.http.get<{ [category: string]: string[] }>(this.searchURL + 'all_criteria')
      .pipe(
        catchError((error) => {
          if (error.status == 404) {
            this.categorySearchAutofillData = createAutofillData();
          }
          return throwError(() => 'Keine Daten vorhanden');
        })
      )
      .subscribe((data) => {
        this.categorySearchAutofillData = createAutofillData(data);
      })
  }

  search(searchValue: string, searchCategory: string) {
    this.searchValue = searchValue;
    this.searchCategory = searchCategory;
    const lowerCaseSearchValue = searchValue.toLowerCase();
    if (searchCategory == 'title') {
      this._searchForSongs(searchValue, searchCategory);
    } else {
      if (this.categorySearchResults.some(result => result.toLowerCase() === lowerCaseSearchValue)) {
        this._searchForSongs(searchValue, searchCategory);
      } else {
        this._preSearchCategory();
      }
    }
  }

  getFilteredCategorySearchData(category: string, filterValue: string): string[] {
    let tempList: string[] = [];
    switch (category) {
      default: {
        tempList = this.categorySearchAutofillData.title ?? [];
        break
      }
      case 'artist_name': {
        tempList = this.categorySearchAutofillData.artist_name ?? [];
        break
      }
      case 'album_name': {
        tempList = this.categorySearchAutofillData.album_name ?? [];
        break
      }
      case 'genre_name': {
        tempList = this.categorySearchAutofillData.genre_name ?? [];
        break
      }
    }
    this.filteredCategorySearchAutofillData = tempList.filter(option => option.toLowerCase().includes(filterValue));
    return this.filteredCategorySearchAutofillData;
  }

  private _searchForSongs(searchValue: string, searchCategory: string) {
    this.http.post<Partial<SongData>[]>(this.searchURL + 'combined', {[searchCategory]: searchValue}).subscribe(
      (data) => {
        let tempList: SongData[] = [];
        for (let i = 0; i < data.length; i++) {
          tempList[i] = createSongData(data[i]);
        }
        this.searchResponse = tempList;
        this.router.navigate(['/searchResults']);
      });
  }

  private _preSearchCategory() {
    this.router.navigate(['/preSearch']);
  }


}
