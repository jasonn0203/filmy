import { SearchService } from './services/search.service';
import { Router } from '@angular/router';
import { MoviesApiService } from 'src/app/services/movies-api.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit {
  userName!: string;
  searchResult: any;
  searchForm = new FormGroup({
    query: new FormControl(null),
  });
  isLogin: string = 'non-login';
  constructor(
    private service: MoviesApiService,
    private searchService: SearchService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('user')) {
          let userStorage = localStorage.getItem('user');
          let userData = userStorage && JSON.parse(userStorage);
          this.userName = userData.name;
          this.isLogin = 'login';
        } else {
          this.isLogin = 'non-login';
        }
      }
    });
  }

  
}
