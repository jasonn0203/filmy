import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResults: any[] = [];

  setSearchResults(results: any[]) {
    this.searchResults = results;
  }

  getSearchResults(): any[] {
    return this.searchResults;
  }
}
