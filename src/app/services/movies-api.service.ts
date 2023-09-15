import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  constructor(private http: HttpClient) {}

  // Duong dan API
  apiURL = 'https://api.themoviedb.org/3';
  //Key api
  keyAPIURL = '70fd1444fe7eef4b76197ab35e2ba587';

  //API cho banner
  bannerAPI(): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiURL}/trending/all/week?api_key=${this.keyAPIURL}`
    );
  }
}
