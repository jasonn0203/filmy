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

  //API cho Movie
  movieListAPI(page: number): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiURL}/trending/movie/day?api_key=${this.keyAPIURL}&page=${page}`
    );
  }
  //API cho Movie
  movieSimilarListAPI(id: number): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiURL}/movie/${id}/similar?api_key=${this.keyAPIURL}`
    );
  }

  //API cho TV
  TvShowsListAPI(page: number): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiURL}/trending/tv/day?api_key=${this.keyAPIURL}&page=${page}`
    );
  }

  // API cho trang chi tiet phim
  MovieDetailAPI(id: any) {
    return this.http.get<any>(
      `${this.apiURL}/movie/${id}?api_key=${this.keyAPIURL}`
    );
  }
  // API cho trang chi tiet tvsshow
  TVShowDetailAPI(id: any) {
    return this.http.get<any>(
      `${this.apiURL}/tv/${id}?api_key=${this.keyAPIURL}`
    );
  }
  // API cho video cua phim
  MovieVideoAPI(id: any) {
    return this.http.get<any>(
      `${this.apiURL}/movie/${id}/videos?api_key=${this.keyAPIURL}`
    );
  }
  // API cho dien vien cua phim
  MovieCastAPI(id: any) {
    return this.http.get<any>(
      `${this.apiURL}/movie/${id}/credits?api_key=${this.keyAPIURL}`
    );
  }

  // API cho dien vien cua tvshows
  TVShowCastAPI(id: any) {
    return this.http.get<any>(
      `${this.apiURL}/tv/${id}/credits?api_key=${this.keyAPIURL}`
    );
  }

  // API cho dien vien
  CastDetailAPI(person_id: number) {
    return this.http.get<any>(
      `${this.apiURL}/person/${person_id}?api_key=${this.keyAPIURL}`
    );
  }
  CastListAPI(page: number) {
    return this.http.get<any>(
      `${this.apiURL}/person/popular/?api_key=${this.keyAPIURL}&page=${page}`
    );
  }

  // search
  SearchMulti(data: any): Observable<any> {
    console.log(data, 'movie query #');

    return this.http.get(
      `${this.apiURL}/search/multi?api_key=${this.keyAPIURL}&query=${data.query}`
    );
  }
}
