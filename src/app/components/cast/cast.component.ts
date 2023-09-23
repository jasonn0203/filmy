import { MoviesApiService } from 'src/app/services/movies-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss'],
})
export class CastComponent implements OnInit {
  constructor(private service: MoviesApiService) {}

  castListResult: any = [];
  noCastAvatar: string =
    'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?pid=ImgDet&rs=1';

  currentPage: number = 1; // gan gia tri page dau tien
  total_pages!: number;

  ngOnInit(): void {
    this.loadPageData(this.currentPage);
  }

  loadPageData(page: number) {
    return this.service.CastListAPI(page).subscribe((data) => {
      console.log(data, 'cast list #');
      this.total_pages = data.total_pages;
      this.castListResult = data.results;
    });
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.loadPageData(this.currentPage);
  }
}
