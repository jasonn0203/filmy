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

  constructor(
    private searchService: SearchService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe(() => {
      this.searchResults = this.searchService.getSearchResults();
    });
  }

  ngOnInit(): void {
    //this.searchResults = this.searchService.getSearchResults();
  }
}
