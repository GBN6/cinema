import { Injectable } from '@angular/core';
import { SelectedMovieService } from './selected-movie.service';

interface seat {
  positon: string
  type: string;
  price: number;
}

interface tickets {
  id: number;
  title: string;
  date: string;
  hour: string;
  seat: seat
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private selectedTickets: tickets[] = []

  addTicket(item: tickets) {
    this.selectedTickets.push(item)
  }

  getTickets(): tickets[] {
    return this.selectedTickets;
  }

  updateSeatType(type: string) {

  }

  mapTickets() {
    let result:string[] = []
    this.selectedTickets.forEach((seat) => {
      if (seat.title === this.movieService.selectedMovie.name && seat.hour === this.movieService.selectedMovie.hour) {
        result.push(seat.seat.positon)
      } 
    })
    this.movieService.selectedMovie.selectedSeats = result
    console.log(this.movieService.getSelectedSeats())
    console.log(this.getTickets())
    }

  constructor(private movieService: SelectedMovieService) { }
}
