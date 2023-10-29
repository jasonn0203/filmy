import { UserService } from 'src/app/services/user.service';
import { MoviesApiService } from './../../services/movies-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CastDetailComponent } from '../cast/cast-detail/cast-detail.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @ViewChild(CastDetailComponent) castDetailComponent!: CastDetailComponent;
  // -------------------------------------------------
  detailResult: any;
  TVDetailResult: any;
  similarFilmResult: any;

  videoResult!: SafeResourceUrl;

  movieCastResult: any;
  tvCastResult: any;

  noCastAvatar: string =
    'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?pid=ImgDet&rs=1';

  isFavorite = false;
  // -------------------------------------------------

  constructor(
    private service: MoviesApiService,
    private userService: UserService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer //thu vien de danh dau url la an toan ( loai tru loi 'unsafe url context')
  ) {
    // Default
    this.router.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.getMovieDetail(id);
        this.getMovieVideo(id);
        this.getMovieCast(id);
        this.getSimilarFilm(id);
      }
    });
  }

  ngOnInit(): void {
    // Lay type va id tung loai

    const contentType = this.router.snapshot.paramMap.get('type');
    const id = this.router.snapshot.paramMap.get('id');
    const getMovieData = () => {
      this.getMovieDetail(id);
      this.getMovieVideo(id);
      this.getMovieCast(id);
      this.getSimilarFilm(id);
    };
    // dkien
    switch (contentType) {
      case 'movies':
        getMovieData();
        break;

      case 'tvshows':
        this.getTVShowDetail(id);
        this.getTVCast(id);
        break;

      default:
        // console.log('no type');

        break;
    }
  }

  addToFavorites(movie: any) {
    this.userService.addToFavorites(movie, this.userService.getUser());
    this.isFavorite = true;
  }

  // GET DETAIL
  getMovieDetail(id: any): void {
    this.service.MovieDetailAPI(id).subscribe((data) => {
      console.log(data, 'movie detail #');
      this.detailResult = data;
    });
  }

  getTVShowDetail(id: any) {
    this.service.TVShowDetailAPI(id).subscribe((data) => {
      console.log(data, 'tvshow detail #');
      this.TVDetailResult = data;
    });
  }
  // GET VIDEO
  getMovieVideo(id: any) {
    this.service.MovieVideoAPI(id).subscribe((data) => {
      console.log(data, 'movie video #');
      this.videoResult = data;

      // Lay link video de gan ra iframe
      const videoURL = data.results[0].key; // tu file api tra ve
      const embedURL = `https://www.youtube.com/embed/${videoURL}`;

      //Danh dau url la safe
      this.videoResult =
        this.sanitizer.bypassSecurityTrustResourceUrl(embedURL);
    });
  }

  // GET CAST
  getMovieCast(id: any) {
    this.service.MovieCastAPI(id).subscribe((data) => {
      // Lay ra 10 dien vien dau tien voi popularity giam dan
      const actorData = data.cast
        .sort((a: any, b: any) => {
          // Sắp xếp theo thuộc tính popularity giảm dần
          return b.popularity - a.popularity;
        })
        .slice(0, 10);

      console.log(actorData, 'cast data');

      this.movieCastResult = actorData;
    });
  }

  getTVCast(id: any) {
    this.service.TVShowCastAPI(id).subscribe((data) => {
      // Lay ra 10 dien vien dau tien voi popularity giam dan
      const actorData = data.cast
        .sort((a: any, b: any) => {
          // Sắp xếp theo thuộc tính popularity giảm dần
          return b.popularity - a.popularity;
        })
        .slice(0, 10);

      console.log(actorData, 'tvcast data');

      this.tvCastResult = actorData;
    });
  }

  getSimilarFilm(id: any) {
    return this.service.movieSimilarListAPI(id).subscribe((data) => {
      console.log(data.results, 'similar film#');
      this.similarFilmResult = data.results;
    });
  }
}
