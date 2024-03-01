import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {createSongData, SongData} from "../interfaces/song-data";
import {Router} from "@angular/router";
import {StatusMessageService} from "./status-message.service";
import {AutofillData, createAutofillData} from "../interfaces/autofill-data";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchURL = 'http://127.0.0.1:8000/api/search/search/'

  categorySearchAutofillData: AutofillData = createAutofillData();

  filteredCategorySearchAutofillData: string[] = [];
  categorySearchResults: string[] = []; //same as filteredCategorySearchAutofillData, but only updated on submit of search form
  searchResponse: SongData[] = [];
  searchValue: string = '';
  searchCategory: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  getAutoCompleteData() {
    this.http.get<{[category: string]: string[]}>(this.searchURL + 'all_criteria').subscribe((data) => {
      this.categorySearchAutofillData = createAutofillData(data);
    })
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
    this.http.post<Partial<SongData>[]>(this.searchURL + 'combined', {[searchCategory]: searchValue}).subscribe( //TODO research errorhandling thats not deprecated
      (data) => {
        let tempList: SongData[] = [];
        for (let i = 0; i < data.length; i++) {
          tempList[i] = createSongData(data[i]);
        }
        console.log(tempList)
        this.searchResponse = tempList;
        this.router.navigate(['/searchResults']);
      });
  }

  private _preSearchCategory() {
    this.router.navigate(['/preSearch']);
    console.log(this.filteredCategorySearchAutofillData)
  }

  getFilteredCategorySearchData(category: string, filterValue: string): string[] {
    let tempList: string[] = [];
    switch (category) {
      default: {tempList = this.categorySearchAutofillData.title ?? []; break}
      case 'interpret': {tempList = this.categorySearchAutofillData.interpret ?? []; break}
      case 'album': {tempList = this.categorySearchAutofillData.album ?? []; break}
      case 'genre': {tempList = this.categorySearchAutofillData.genre ?? []; break}
    }
    this.filteredCategorySearchAutofillData = tempList.filter(option => option.toLowerCase().includes(filterValue));
    return this.filteredCategorySearchAutofillData;
  }


}
