import { CastComponent } from './components/cast/cast.component';
import { CastDetailComponent } from './components/cast/cast-detail/cast-detail.component';
import { DetailComponent } from './components/detail/detail.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvshowComponent } from './components/tvshow/tvshow.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: TvshowComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movies/:id', component: DetailComponent },
  { path: 'tvshows/:id', component: DetailComponent },
  { path: 'casts', component: CastComponent },
  { path: 'casts/:id', component: CastDetailComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
