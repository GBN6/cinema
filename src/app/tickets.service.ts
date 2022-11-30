import { Injectable } from '@angular/core';

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

  // mapTickets() {
  //   let result:string[] = []
  //   this.selectedTickets.forEach((seat) => {
  //     if (seat.id === this.selectedTickets.id && seat.hour === this.selectedTickets.hour) {
  //       result.push(seat.seatPos)
  //     } 
  //   })
  //   this.selectedTickets.selectedSeats = result
  //   console.log(this.selectedTickets.selectedSeats)
  //   }

  constructor() { }
}
