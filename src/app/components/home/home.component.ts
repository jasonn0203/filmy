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
      data.results.sort(
        (lowestVote: any, highestVote: any) =>
          highestVote.vote_average - lowestVote.vote_average
      );
      //Slice de lay ra 5 ket qua dau tien sau khi sort
      highestVoteBannerData = data.results.slice(0, 5); //results la bien api tra ra
      this.bannerData = highestVoteBannerData;
      console.log(highestVoteBannerData);
    });
  }
}
