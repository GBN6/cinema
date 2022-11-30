import { Injectable } from '@angular/core';

interface selectedMovie {
  id: number;
  name: string;
  hour: string;
  reservedSeats: string[]
  selectedSeats: string[]
}


@Injectable({
  providedIn: 'root'
})
export class SelectedMovieService {
  selectedDate: string = ''

  selectedMovie:selectedMovie = {
    id: 0,
    name: '',
    hour: '',
    reservedSeats: [],
    selectedSeats: []
  }

  addSeat(seat: string) {
    this.selectedMovie.selectedSeats.push(seat)
  }

  getSelectedSeats(): string[] {
    return this.selectedMovie.selectedSeats
  }

  removeSeat(seat: string) {
    let index = this.selectedMovie.selectedSeats.indexOf(seat);
    this.selectedMovie.selectedSeats.splice(index, 1);
  }

  constructor() {
   }
}
