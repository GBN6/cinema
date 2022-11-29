import { Injectable } from '@angular/core';

interface savedSeats {
  id: number;
  hour: string;
  seatPos: string;
}

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
  private saveSelectedSeats: savedSeats[] = []

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

  addSavedSeats(item: savedSeats) {
    this.saveSelectedSeats.push(item)
  }

  getSavedSeats(): savedSeats[] {
    return this.saveSelectedSeats;
  }

  mapSavedSeats() {
    let result:string[] = []
    this.saveSelectedSeats.forEach((seat) => {
      if (seat.id === this.selectedMovie.id && seat.hour === this.selectedMovie.hour) {
        result.push(seat.seatPos)
      } 
    })
    this.selectedMovie.selectedSeats = result
    console.log(this.selectedMovie.selectedSeats)
    }

  constructor() {
   }
}
