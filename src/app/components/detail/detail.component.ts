import { MoviesApiService } from './../../services/movies-api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  videoResult!: SafeResourceUrl;

  movieCastResult: any;
  tvCastResult: any;

  noCastAvatar: string =
    'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?pid=ImgDet&rs=1';
  // -------------------------------------------------

  constructor(
    private service: MoviesApiService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer //thu vien de danh dau url la an toan ( loai tru loi 'unsafe url context')
  ) {}

  ngOnInit(): void {
    // Lay type va id tung loai
    const contentType = this.router.snapshot.paramMap.get('type');
    const id = this.router.snapshot.paramMap.get('id');

    // dkien
    switch (contentType) {
      case 'movies':
        this.getMovieDetail(id);
        this.getMovieVideo(id);
        this.getMovieCast(id);
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

  // GET DETAIL
  getMovieDetail(id: any) {
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
}
