import { MoviesApiService } from './../../services/movies-api.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  typeList: any = [];

  currentPage: number = 1; // gan gia tri page dau tien

  // Biến để lưu giá trị loại card muốn truyền vào
  @Input() type!: string;

  total_pages!: number;
  constructor(private service: MoviesApiService) {}

  ngOnInit(): void {
    this.getProgramTypeList();
  }

  getProgramTypeList() {
    this.loadPageData(this.currentPage); // Load data
  }

  loadPageData(page: number) {
    switch (this.type) {
      case 'movies':
        this.service.movieListAPI(page).subscribe((data) => {
          this.typeList = data.results;
          this.total_pages = data.total_pages;
          console.log(data, 'data movie list #');
        });
        break;

      case 'tvshows':
        this.service.TvShowsListAPI(page).subscribe((data) => {
          this.typeList = data.results;
          this.total_pages = data.total_pages;
          console.log(data, 'data tvshow list #');
        });
        break;

      default:
        console.log('No type available!');
        break;
    }
  }
  pageChanged(page: number) {
    this.currentPage = page;
    this.loadPageData(this.currentPage);
  }
}
