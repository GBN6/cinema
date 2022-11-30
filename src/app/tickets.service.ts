import { Injectable } from '@angular/core';
import { SelectedMovieService } from './selected-movie.service';

interface seat {
  positon: string;
  type: string;
  price: number;
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
        ticket.title === this.movieService.selectedMovie.name &&
        ticket.hour === this.movieService.selectedMovie.hour
      ) {
        this.selectedTickets.splice(index, 1);
      }
    });
  }

  updateSeatTypeAndPrice(seat: string, type: string, price: number) {
    this.selectedTickets.map((ticket) => {
      if (
        ticket.seat.positon === seat &&
        ticket.title === this.movieService.selectedMovie.name &&
        ticket.hour === this.movieService.selectedMovie.hour
      ) {
        ticket.seat.type = type;
        ticket.seat.price = price;
      }
    });
  }

  getTicketType(seat: string): string {
    let type = '';
    for (let ticket of this.selectedTickets) {
      if (
        ticket.seat.positon === seat &&
        ticket.title === this.movieService.selectedMovie.name &&
        ticket.hour === this.movieService.selectedMovie.hour
      ) {
        type = ticket.seat.type;
      } else {
        type = 'Normalny';
      }
    }
    console.log(type);
    return type;
  }

  mapTickets() {
    let result: string[] = [];
    this.selectedTickets.forEach((seat) => {
      if (
        seat.title === this.movieService.selectedMovie.name &&
        seat.hour === this.movieService.selectedMovie.hour
      ) {
        result.push(seat.seat.positon);
      }
    });
    this.movieService.selectedMovie.selectedSeats = result;
    console.log(this.movieService.getSelectedSeats());
    console.log(this.getTickets());
  }

  constructor(private movieService: SelectedMovieService) {}
}
