import { Router } from '@angular/router';
import { UserRegister, UserLogin } from './../../../model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = 'http://localhost:3000/users';
  private favoritesUrl = 'http://localhost:3000/favorites';
  loginErrorEmitter = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: UserRegister) {
    this.http
      .post(this.userURL, user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          console.log(result);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['login']);
        }
      });
  }

  loginUser(user: UserLogin) {
    this.http
      .get<UserRegister[]>(
        `http://localhost:3000/users?email=${user.email}&password=${user.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['home']);
        } else {
          this.loginErrorEmitter.emit(true); // Đặt biến lỗi thành true
        }
      });
  }

  addToFavorites(movie: any, userId: number) {
    // Check if the movie with the same ID already exists in the user's favorites
    this.getFavoritesByUser(userId).subscribe((favorites: any) => {
      const movieId = movie.id;

      if (favorites.some((favorite: any) => favorite.movie.id === movieId)) {
        // Movie already exists in favorites, handle this case (e.g., show a message)
        alert('Movie is already in favorites.');
      } else {
        // Movie is not in favorites, so add it
        this.http.post(this.favoritesUrl, { userId, movie }).subscribe(() => {
          // Handle success (e.g., set isFavorite to true)
        });
      }
    });
  }

  getFavoritesByUser(userId: number) {
    return this.http.get(`${this.favoritesUrl}?userId=${userId}`);
  }

  removeFavorite(favoriteId: number, userId: number) {
    const url = `${this.favoritesUrl}/?id=${favoriteId}&userId=${userId}`;
    this.http.delete(url).subscribe(
      (data) => {
        // Handle successful response (e.g., removing the favorite from the local list).
        console.log(data);
      },
      (error) => {
        // Handle errors here, e.g., show an error message to the user.
        console.error('Error deleting favorite:', error);
      }
    );
  }

  getUser() {
    const userString = window.localStorage.getItem('user');
    let userID;
    if (userString !== null) {
      userID = JSON.parse(userString).id;
      // Move this line here
      return userID;
    } else {
      return null; // or handle the case where the user data is not found
    }
  }
}
