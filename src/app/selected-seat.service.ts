import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SelectedSeatService {

  private selectedSeats: string[] = []

  addSeat(seat: string) {
    this.selectedSeats.push(seat)
  }

  getSelectedSeats(): string[] {
    return this.selectedSeats
  }

  removeSeat(seat: string) {
    let index = this.selectedSeats.indexOf(seat);
    this.selectedSeats.splice(index, 1);
  }

  constructor() { }
}
