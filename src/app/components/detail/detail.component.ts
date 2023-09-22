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

  detailResult: any;
  videoResult!: SafeResourceUrl;
  movieCastResult: any;

  noCastAvatar: string =
    'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?pid=ImgDet&rs=1';

  constructor(
    private service: MoviesApiService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer //thu vien de danh dau url la an toan ( loai tru loi 'unsafe url context')
  ) {}

  ngOnInit(): void {
    // Lay id phim
    let getMovieID = this.router.snapshot.paramMap.get('id');
    console.log(getMovieID, ': Movie ID#');
    this.getMovieDetail(getMovieID);

    this.getMovieVideo(getMovieID);

    this.getMovieCast(getMovieID);
  }

  getMovieDetail(id: any) {
    this.service.MovieDetailAPI(id).subscribe((data) => {
      console.log(data, 'movie detail #');
      this.detailResult = data;
    });
  }
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
}
