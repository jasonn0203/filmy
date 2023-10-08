import { MoviesApiService } from './services/movies-api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import AppComponent from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TvshowComponent } from './components/tvshow/tvshow.component';
import { DetailComponent } from './components/detail/detail.component';
import { MoviesComponent } from './components/movies/movies.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { CastDetailComponent } from './components/cast/cast-detail/cast-detail.component';
import { CastComponent } from './components/cast/cast.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TvshowComponent,
    DetailComponent,
    MoviesComponent,
    MovieCardComponent,
    CastDetailComponent,
    CastComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [MoviesApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
