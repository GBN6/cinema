import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Movies } from './movies';
import { Show } from './movies.service';
import { SelectedMovieService } from './selected-movie.service';

export interface seat {
  positon: string;
  type: string;
  price: number;
  special: boolean;
}

export interface tickets {
  id: number;
  showId: number;
  title: string;
  date: string;
  hour: string;
  screen: string;
  seat: seat;
}

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private selectedTickets: tickets[] = [];

  selectedMovie: Movies;
  selectedShow: Show;

  private isCartOpen$$ = new BehaviorSubject({ cartOpen: false });
  private ticketsAmmountSubject$$ = new BehaviorSubject({ ticketsAmount: 0 });

  get cartStatus$() {
    return this.isCartOpen$$.asObservable();
  }

  get ticketAmount$() {
    return this.ticketsAmmountSubject$$.asObservable();
  }

  openCart() {
    this.isCartOpen$$.next({ cartOpen: true });
  }

  closeCart() {
    this.isCartOpen$$.next({ cartOpen: false });
  }

  clearSelectedTickets() {
    this.selectedTickets = [];
    this.ticketsAmmountSubject$$.next({
      ticketsAmount: this.selectedTickets.length,
    });
  }

  updateSelectedMovie() {
    this.selectedMovie = this.movieService.getSelectedMovie();
  }

  updateSelectedShow() {
    this.selectedShow = this.movieService.getSelectedShow();
  }

  addTicket(item: tickets) {
    this.selectedTickets.push(item);
    this.ticketsAmmountSubject$$.next({
      ticketsAmount: this.selectedTickets.length,
    });
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
        this.ticketsAmmountSubject$$.next({
          ticketsAmount: this.selectedTickets.length,
        });
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
        if (ticket.seat.type !== '') {
          type = ticket.seat.type;
        }
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

  isTicketTypeSlected() {
    let ticketTypeSelected = false;
    this.getTickets().forEach((ticket) => {
      if (ticket.seat.type !== '') {
        ticketTypeSelected = true;
      }
    });
    return ticketTypeSelected;
  }

  constructor(private movieService: SelectedMovieService) {
    this.selectedMovie = this.movieService.getSelectedMovie();
    this.selectedShow = this.movieService.getSelectedShow();
  }
}
