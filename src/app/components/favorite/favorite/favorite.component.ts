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

  getFavoriteList() {
    this.userService
      .getFavoritesByUser(this.userService.getUser())
      .subscribe((result) => {
        this.favoriteResult = result;
        console.log(result);
      });
  }

  removeFavorite(favorite: any) {
    const userId = this.userService.getUser();
    this.userService.removeFavorite(favorite.id, userId).subscribe(
      () => {
        console.log('Favorite removed');
        // Thực hiện các công việc cần thiết sau khi xóa
      },
      (error) => {
        console.error('Error removing favorite:', error);
        // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi cho người dùng)
      }
    );
  }
}
