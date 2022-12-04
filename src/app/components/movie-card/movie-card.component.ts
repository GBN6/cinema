import { Component, OnInit, Input } from '@angular/core';
import { Movies } from 'src/app/movies';
import { newUser } from 'src/app/user';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';
import { MoviesService } from 'src/app/movies.service';
import { Show } from 'src/app/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;
  shows: Show[] = [];
  user = newUser;
  selectedMovie?: Movies;

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

  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService,
    private moviesService: MoviesService
  ) {}

  handleSelectedMovie(show: Show) {
    this.movieService.addSubjectMovie(this.movie)
    this.movieService.addSubjectShow(show)
    this.ticketService.updateSelectedMovie()
    this.ticketService.updateSelectedShow()
    this.ticketService.mapTickets()
  }

  ngOnInit(): void {
    this.moviesService.getShow(this.movie.id).subscribe((response) => {
      this.shows = response
    });
  }
}
