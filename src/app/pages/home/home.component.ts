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
  week: Date[] = [];
  clickedIndex = 0;
  private subscriptions = new Subscription();
  loggedIn = false;

  getDates(n: number) {
    for (let i: number = 0; i < n; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      this.week.push(today);
    }
  }

  changeState(index: number) {
    this.clickedIndex = index;
  }

  getMovies() {
    const sub = this.moviesService.getMovies().subscribe((response) => {
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
    this.getMovies();
    this.getDates(7);
    this.movieService.selectedDate = this.week[0].toLocaleDateString('en-GB');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
