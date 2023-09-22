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

  constructor(
    private service: MoviesApiService,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let getCastId = this.router.snapshot.paramMap.get('id');
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

    // Check if the provided date is valid
    if (isNaN(birthDate.getTime())) {
      return null;
    }

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday has not occurred this year yet
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
