import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchResults!: any[];
  query!: string;

  constructor(private searchService: SearchService) {
    this.searchResults = [];
  }

  ngOnInit(): void {
    this.searchResults = this.searchService.getSearchResults();
  }
}
