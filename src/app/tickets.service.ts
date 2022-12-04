import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movies } from './movies';
import { Show } from './movies.service';
import { SelectedMovieService } from './selected-movie.service';

interface seat {
  positon: string;
  type: string;
  price: number;
  special: boolean
}

interface tickets {
  id: number;
  title: string;
  date: string;
  hour: string;
  seat: seat;
}

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private selectedTickets: tickets[] = [];

  selectedMovie: Movies;
  selectedShow: Show;

  // private ticketsAmmountSubject$$ = new Subject<number>();
  // ticketAmount = this.ticketsAmmountSubject$$.asObservable();

  updateSelectedMovie() {
    this.selectedMovie = this.movieService.getSelectedMovie();
  }

  updateSelectedShow() {
    this.selectedShow = this.movieService.getSelectedShow();
  }

  addTicket(item: tickets) {
    this.selectedTickets.push(item);
  }

  getTickets(): tickets[] {
    return this.selectedTickets;
  }

  removeTicket(seat: string) {
    this.selectedTickets.forEach((ticket, index) => {
      if (
        ticket.seat.positon === seat &&
        ticket.title === this.selectedMovie.title &&
        ticket.hour === this.selectedShow.hour
      ) {
        this.selectedTickets.splice(index, 1);
      }
    });
  }

  updateSeatTypeAndPrice(seat: string, type: string, price: number) {
    this.selectedTickets.map((ticket) => {
      if (
        ticket.seat.positon === seat &&
        ticket.title === this.selectedMovie.title &&
        ticket.hour === this.selectedShow.hour
      ) {
        ticket.seat.type = type;
        ticket.seat.price = price;
      }
    });
  }

  getTicketType(seat: string): string {
    let type = '';
    this.selectedTickets.map((ticket) => {
      if (
        ticket.seat.positon === seat &&
        ticket.title === this.selectedMovie.title &&
        ticket.hour === this.selectedShow.hour
      ) {
        type = ticket.seat.type;
      }
    });
    return type;
  }

  mapTickets() {
    let result: string[] = [];
    this.selectedTickets.forEach((seat) => {
      if (
        seat.title === this.selectedMovie.title &&
        seat.hour === this.selectedShow.hour
      ) {
        result.push(seat.seat.positon);
      }
    });
    this.movieService.selectedSeats = result;
  }

  constructor(private movieService: SelectedMovieService) {
    this.selectedMovie = this.movieService.getSelectedMovie();
    this.selectedShow = this.movieService.getSelectedShow();
  }
}
