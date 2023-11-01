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
  ngOnInit(): void {
    this.getFavoriteList();
  }

  
}
