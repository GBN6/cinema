import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketType } from 'src/app/components/ticket-selection/ticket-selection.component';
import { TicketsService } from 'src/app/tickets.service';
import { Movies } from 'src/app/movies';
import { MoviesService, Show } from 'src/app/movies.service';
import { Screen } from 'src/app/movies.service';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
})
export class SeatsComponent implements OnInit {
  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService,
    private moviesService: MoviesService
  ) {}

  date = this.movieService.selectedDate;
  selected = this.movieService.selectedMovie.selectedSeats;

  movie: Movies = {
    id: 0,
    img: '',
    title: '',
    genre: '',
    length: '',
    ageRest: '',
    description: '',
    score: '',
    director: '',
    actors: [''],
    boxOff: 0,
    premier: false,
  };

  show: Show = {
    filmId: 0,
    hour: '',
    screen: '',
    id: 0,
    reservedSeats: [''],
    priceList: [],
  };

  // screen: Screen[] = [];

  screen: Screen = {
    colu: 0,
    id: 0,
    name: '',
    rows: 0,
    specialSeats: [],
  };

  rows: string[] = [...Array().keys()].map((i) => String.fromCharCode(i + 65));
  cols: number[] = [...Array().keys()].map((i) => i);

  getStatus(seatPos: string) {
    if (this.show.reservedSeats.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    return 'freeSeat';
  }

  seatClicked(seatPos: string, id: number, hour: string, title: string) {
    let index = this.selected.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.movieService.removeSeat(seatPos);
      this.ticketService.removeTicket(seatPos);
    } else {
      //push to selected array only if it is not reserved
      if (this.show.reservedSeats.indexOf(seatPos) === -1) {
        this.movieService.addSeat(seatPos);
        this.ticketService.addTicket({
          id: Math.random(),
          title: title,
          date: this.date,
          hour: hour,
          seat: { positon: seatPos, type: '', price: 0 },
        });
      }
    }
    console.log(this.ticketService.getTickets());
  }

  handleTicketType(ticket: TicketType) {
    console.log(ticket);
  }

  ngOnInit(): void {
    this.movieService.selectedMovie$$.subscribe((movie) => {
      this.movie = movie;
    });
    this.movieService.selectedShow$$.subscribe((show) => {
      this.show = show;
    });

    this.moviesService
      .getScreen(this.show.screen)
      .pipe(
        tap((item) => console.log(item)),
        mergeMap((item) => item)
      )
      .subscribe((item) => {
        console.log(item)
        this.screen = item
      });
  }

  ngOnDestroy() {}
}

// (ticketType)="handleTicketType($event)"
