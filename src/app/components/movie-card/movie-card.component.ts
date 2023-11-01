import { ActivatedRoute, Router } from '@angular/router';
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
  isHighestVoteActive: boolean = false;
  isLowestVoteActive: boolean = false;

  isASCsort: boolean = false;
  isDESCsort: boolean = false;

  constructor(private service: MoviesApiService, private router: Router) {}

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

  // Hàm để xác định trạng thái active cho tab Highest Vote
  activateHighestVoteTab() {
    this.isHighestVoteActive = !this.isHighestVoteActive;
    this.isLowestVoteActive = false;
  }

  //Hàm lọc phim
  filterByVoteASC() {
    this.typeList = this.typeList.sort((a: any, b: any) => {
      return this.isASCsort
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average;
    });
  }

  filterByVoteDESC() {
    this.typeList = this.typeList.sort((a: any, b: any) => {
      return this.isDESCsort
        ? b.vote_average - a.vote_average
        : a.vote_average - b.vote_average;
    });
  }
  // Hàm để xác định trạng thái active cho tab Lowest Vote
  toggleVoteSortASC() {
    this.isASCsort = !this.isASCsort;
    this.isLowestVoteActive = !this.isLowestVoteActive;
    this.isHighestVoteActive = false;
    this.filterByVoteASC();
  }

  toggleVoteSortDESC() {
    this.isDESCsort = !this.isDESCsort;
    this.isHighestVoteActive = !this.isHighestVoteActive;
    this.isLowestVoteActive = false;
    this.filterByVoteDESC();
  }
}
