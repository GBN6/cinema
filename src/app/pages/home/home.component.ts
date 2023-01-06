import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { MoviesService } from 'src/app/movies.service';
import { Movies } from '../../movies';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movies[] = [];
  week: string[] = [];
  clickedIndex = 0;
  currentIndex = 0;
  private subscriptions = new Subscription();
  loggedIn = false;

  getDates(n: number) {
    let curr = new Date();
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first))
        .toLocaleDateString('en-GB')
        .slice(0, 10);
      this.week.push(day);
    }
    console.log(this.week);
  }

  setDefaultDate() {
    let today = new Date().toLocaleDateString('en-GB').slice(0, 10);
    this.week.forEach((date, index) => {
      if (date === today) {
        this.clickedIndex = index;
        this.currentIndex = index;
      }
    });
    console.log(today);
  }

  disableDateButtons() {}

  // getDates(n: number) {
  //   for (let i: number = 0; i < n; i++) {
  //     let today = new Date();
  //     today.setDate(today.getDate() + i);
  //     this.week.push(today);
  //   }
  // }

  changeState(index: number) {
    this.clickedIndex = index;
    this.getMovies();
    this.movieService.selectedDate = this.week[this.clickedIndex];
  }

  getMovies() {
    const sub = this.moviesService
      .getMovies(this.clickedIndex)
      .subscribe((response) => {
        this.movies = response;
      });
    this.subscriptions.add(sub);
  }

  constructor(
    private movieService: SelectedMovieService,
    private moviesService: MoviesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getDates(7);
    this.setDefaultDate();
    this.getMovies();
    this.movieService.selectedDate = this.week[this.clickedIndex];
    console.log(this.week[0] > this.week[this.clickedIndex]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
