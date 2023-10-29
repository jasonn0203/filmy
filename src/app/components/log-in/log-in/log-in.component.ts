import { UserLogin } from './../../../../../model';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  login: FormGroup | any;
  loginError = false;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl(),
      pw: new FormControl(),
    });
    this.userService.loginErrorEmitter.subscribe((error) => {
      this.loginError = error;
    });
  }

  loginUser(user: UserLogin) {
    this.userService.loginUser(user);
  }
}
