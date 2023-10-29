import { FormGroup, FormControl } from '@angular/forms';
import { UserRegister } from './../../../../../model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  register: FormGroup | any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.register = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      pw: new FormControl(),
    });
  }

  registerUser(user: UserRegister) {
    this.userService.registerUser(user);
  }
}
