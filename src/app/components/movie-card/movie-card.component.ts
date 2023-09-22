import { MoviesApiService } from './../../services/movies-api.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  typeList: any = [];

  // Biến để trữ giá trị loại card muốn truyền vào
  @Input() type!: string;
  constructor(private service: MoviesApiService) {}

  ngOnInit(): void {
    this.getProgramTypeList();
  }

  getProgramTypeList() {
    switch (this.type) {
      case 'movies':
        this.service.movieListAPI().subscribe((data) => {
          this.typeList = data.results;
          console.log(data, 'data movie list #');
        });
        break;

      case 'tvshows':
        this.service.TvShowsListAPI().subscribe((data) => {
          this.typeList = data.results;
          console.log(data, 'data tvshow list #');
        });
        break;

      default:
        console.log('No type available!');

        break;
    }
  }
}
