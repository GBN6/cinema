import { Component, OnInit, Input } from '@angular/core';
import { Movies } from 'src/app/movies';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';
import { MoviesService } from 'src/app/movies.service';
import { Show } from 'src/app/movies.service';
import { LoginService } from 'src/app/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;
  private subscriptions = new Subscription();
  shows: Show[] = [];
  selectedMovie?: Movies;
  loggedIn = false;

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

    this.subscriptions.add(sub);
  }

  getShow() {
    const sub = this.moviesService
      .getShow(this.movie.id)
      .subscribe((response) => {
        this.shows = response;
      });

    this.subscriptions.add(sub);
  }

  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService,
    private moviesService: MoviesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getLoggedInStatus();
    this.getShow();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
