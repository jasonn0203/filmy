import { SearchService } from './services/search.service';
import { Router } from '@angular/router';
import { MoviesApiService } from 'src/app/services/movies-api.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit {
  searchResult: any;
  searchForm = new FormGroup({
    query: new FormControl(null),
  });
  constructor(
    private service: MoviesApiService,
    private searchService: SearchService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  submitSearch() {
    const searchQuery = this.searchForm.value.query;
    this.service.SearchMulti(this.searchForm.value).subscribe((data) => {
      console.log(data.results, '# search results');
      this.searchResult = data.results;
      this.searchService.setSearchResults(data.results);
      this.router.navigate(['/search/', searchQuery]);
      this.searchForm.reset();
    });
  }
}
