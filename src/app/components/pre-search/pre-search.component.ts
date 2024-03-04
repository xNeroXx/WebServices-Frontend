import {AfterContentChecked, Component} from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-pre-search',
  templateUrl: './pre-search.component.html',
  styleUrl: './pre-search.component.scss'
})
export class PreSearchComponent implements AfterContentChecked {
  filteredOptions: string[] = []

  constructor(protected searchService: SearchService) {
  }

  ngAfterContentChecked() {
    this.filteredOptions = this.searchService.categorySearchResults;
  }

  handleOptionSelection(option: string) {
    (document.getElementById('searchbar') as HTMLInputElement).value = option;
    document.getElementById('search-submit')?.click();
  }

}
