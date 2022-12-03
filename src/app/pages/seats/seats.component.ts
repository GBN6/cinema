import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketType } from 'src/app/components/ticket-selection/ticket-selection.component';
import { TicketsService } from 'src/app/tickets.service';
import { Movies } from 'src/app/movies';
import { Show } from 'src/app/movies.service';
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
})
export class SeatsComponent implements OnInit {
  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService
  ) {}

  rows: string[] = [...Array(5).keys()].map((i) => String.fromCharCode(i + 65));
  cols: number[] = [...Array(10).keys()].map((i) => i);

  reserved = this.movieService.selectedMovie.reservedSeats;

  id = this.movieService.selectedMovie.id;
  title = this.movieService.selectedMovie.name;
  hour = this.movieService.selectedMovie.hour;
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
    id: 0,
    reservedSeats: [''],
  };

  getStatus(seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
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
      if (this.reserved.indexOf(seatPos) === -1) {
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
  }

  ngOnDestroy() {}
}

// (ticketType)="handleTicketType($event)"
