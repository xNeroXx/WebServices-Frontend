import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {UploadComponent} from "../upload/upload.component";
import {SearchService} from "../../services/search.service";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";

export interface CategoryOption {
  value: string,
  displayValue: string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIcon,
    MatButton,
    MatIconButton,
    MatMiniFabButton,
    MatChipListbox,
    MatChipOption,
  ],
})
export class SearchComponent implements OnInit {
  searchCategory: string = 'title';
  searchValue: string = '';
  autoCompleteData: {[category: string]: string[]} = {};
  //autoCompleteData: SearchOption[] = [];
  //filteredAutoCompleteData: Observable<string[]> | undefined;
  searchForm = new FormGroup({
    searchValue: new FormControl(''),
    searchCategory: new FormControl('title')
  });

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    //this.searchService.getAutoCompleteData(); TODO remove Comment
    this.loadAutoCompleteData()
  }

  onSearchSubmit() {
    this.searchForm.value.searchValue =  (document.getElementById('searchbar') as HTMLInputElement).value
    this.searchService.categorySearchResults = this.filteredAutoCompleteData;
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.searchCategory = this.searchForm.value.searchCategory ?? 'title';
    this.searchService.search(this.searchValue, this.searchCategory);
  }

  loadAutoCompleteData() {
    this.searchService.getAutoCompleteData();
  }

  get filteredAutoCompleteData(): string[] {
    const filterValue = this.searchForm.value.searchValue?.toLowerCase() ?? '';

    //return this.autoCompleteData[this.searchForm.value.searchCategory ?? 'title'].filter(option => option.toLowerCase().includes(filterValue));
    return this.searchService.getFilteredCategorySearchData(this.searchForm.value.searchCategory ?? 'title', filterValue);
  }
}
