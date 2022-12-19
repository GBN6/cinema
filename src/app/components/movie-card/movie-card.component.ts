import { Component, OnInit, Input } from '@angular/core';
import { Movies } from 'src/app/movies';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';
import { MoviesService } from 'src/app/movies.service';
import { Show } from 'src/app/movies.service';
import { LoginService } from 'src/app/login.service';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movies = {} as Movies;
  private subscriptions = new Subscription();
  isMovieInWishList = false;
  shows: Show[] = [];
  selectedMovie?: Movies;
  loggedIn = false;
  userId = 0;

  showMoreInfo(event: Event, movie: Movies) {
    const buttonText = (event.target as HTMLElement).textContent;
    if (buttonText === 'Więcej') {
      (event.target as HTMLElement).textContent = 'Schowaj';
      this.selectedMovie = movie;
    } else {
      (event.target as HTMLElement).textContent = 'Więcej';
      this.selectedMovie = undefined;
    }
  }

  handleSelectedMovie(show: Show) {
    this.movieService.addSubjectMovie(this.movie);
    this.movieService.addSubjectShow(show);
    this.ticketService.updateSelectedMovie();
    this.ticketService.updateSelectedShow();
    this.ticketService.mapTickets();
  }

  getLoggedInStatus() {
    const sub = this.loginService.isUserLoggedIn$.subscribe((response) => {
      this.loggedIn = response;
    });

    const sub2 = this.loginService.user$.subscribe(({ id }) => {
      this.userId = id;
    });

    this.subscriptions.add(sub);
    this.subscriptions.add(sub2);
  }

  getMovieWishListStatus() {
    if (this.loggedIn) {
      const sub = this.userDataService
        .isMovieInWishList(this.userId, this.movie.id)
        .subscribe((response) => {
          this.isMovieInWishList = response;
          console.log(this.isMovieInWishList);
        });
      this.subscriptions.add(sub);
    }
  }

  getShow() {
    const sub = this.moviesService
      .getShow(this.movie.id)
      .subscribe((response) => {
        this.shows = response;
      });

    this.subscriptions.add(sub);
  }

  addToWishlist(id: number, movie: Movies) {
    this.userDataService.addMovieToWishlist(id, movie);
    this.isMovieInWishList = true
  }

  removeFromWishList(userId: number, movieId: number) {
    this.userDataService.removeFromWishList(userId, movieId);
    this.isMovieInWishList = false
  }

  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService,
    private moviesService: MoviesService,
    private loginService: LoginService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.getLoggedInStatus();
    this.getShow();
    this.getMovieWishListStatus();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
