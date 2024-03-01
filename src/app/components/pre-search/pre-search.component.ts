import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-pre-search',
  templateUrl: './pre-search.component.html',
  styleUrl: './pre-search.component.scss'
})
export class PreSearchComponent implements AfterContentChecked{
  filteredOptions: string[] = []

  constructor(protected searchService: SearchService) {
  }

  ngAfterContentChecked() {
    this.filteredOptions = this.searchService.categorySearchResults;
  }

  handleOptionSelection(option: string) {
    console.log('value' + (document.getElementById('searchbar') as HTMLInputElement).value);
    (document.getElementById('searchbar') as HTMLInputElement).value = option;
    console.log('value' + (document.getElementById('searchbar') as HTMLInputElement).value);
    document.getElementById('search-submit')?.click();
  }

}
