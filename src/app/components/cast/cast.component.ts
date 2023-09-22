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
  ngOnInit(): void {
    this.getCastList();
  }

  getCastList() {
    return this.service.CastListAPI().subscribe((data) => {
      console.log(data, 'cast list #');
      this.castListResult = data.results;
    });
  }
}
