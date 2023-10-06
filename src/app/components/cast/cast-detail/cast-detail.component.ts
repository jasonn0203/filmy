import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-cast-detail',
  templateUrl: './cast-detail.component.html',
  styleUrls: ['./cast-detail.component.scss'],
})
export class CastDetailComponent implements OnInit {
  castDetailResult: any;

  noCastAvatar: string =
    'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?pid=ImgDet&rs=1';

  constructor(
    private service: MoviesApiService,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let getCastId = this.router.snapshot.paramMap.get('cast_id');
    console.log(getCastId);

    this.getCastDetail(getCastId);
  }

  // Lay thong tin dien vien
  getCastDetail(id: any) {
    return this.service.CastDetailAPI(id).subscribe((data) => {
      console.log(data, 'cast : ');
      this.castDetailResult = data;
    });
  }

  calculateAge(birthday: string): number | null {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    // Check ngay co hop le ko
    if (isNaN(birthDate.getTime())) {
      return null;
    }

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Tinh tuoi ( neu chua toi birthday thi - 1)
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  }
}
