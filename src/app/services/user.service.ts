import { Router } from '@angular/router';
import { UserRegister, UserLogin } from './../../../model';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = 'http://localhost:3000/users';
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
}
