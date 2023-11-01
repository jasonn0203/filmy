import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favoriteResult: any;
  constructor(private userService: UserService) {}

  getFavoriteList() {
    this.userService
      .getFavoritesByUser(this.userService.getUser())
      .subscribe((result) => {
        this.favoriteResult = result;
        console.log(result);
      });
  }
  ngOnInit(): void {
    this.getFavoriteList();
  }
  removeFavorite(favorite: any) {
    const userId = this.userService.getUser();
    this.userService.removeFavorite(favorite, userId);
  }
}
