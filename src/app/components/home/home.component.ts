import { MoviesApiService } from './../../services/movies-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: MoviesApiService) {}

  //Get du lieu :
  bannerData: any = [];

  ngOnInit(): void {
    this.getBannerData();
  }

  // Ham de get du lieu tu service

  getBannerData() {
    return this.service.bannerAPI().subscribe((data) => {
      let highestVoteBannerData: any;
      console.log(data, '*_data for banner');
      //Loc ket qua banner de chi lay 3 banner co voting cao nhat
      // const sortBanner = data.results.sort(
      //   (lowestVote: any, highestVote: any) =>
      //     highestVote.vote_average - lowestVote.vote_average
      // );
      const dataResults = data.results;
      const totalResults = dataResults.length;
      const randomBanner = Math.floor(Math.random() * totalResults);

      //Slice de lay ra 5 ket qua dau tien sau khi sort
      highestVoteBannerData = dataResults.slice(randomBanner, randomBanner + 5); //lấy khoảng từ random -> random + 5 ( 5 phần tử)
      this.bannerData = highestVoteBannerData;
    });
  }
}
