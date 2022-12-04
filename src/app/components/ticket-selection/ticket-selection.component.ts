import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Movies } from 'src/app/movies';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';

import { PriceList } from 'src/app/movies.service';
import { tick } from '@angular/core/testing';

export interface TicketType {
  seatPostiotion: string;
  type: string;
  price: number;
}

@Component({
  selector: 'app-ticket-selection',
  templateUrl: './ticket-selection.component.html',
  styleUrls: ['./ticket-selection.component.css'],
})
export class TicketSelectionComponent implements OnInit {
  @Input() selected: string = '';
  @Input() index: number = 0
  @Input() specialSeats: string[] = []

  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService
  ) {}

  ticketSelection: PriceList[] = [];

  trashCanIcon = faTrashCan;

  selectedTicket: string = '';

  selectTicketPrice(value: string) {
    let price = 0
    this.ticketSelection.forEach((ticket) =>{
      if (ticket.type === value) {
        if (this.isSelectedSeatSpecial()) {
          price = ticket.price + 5
        } else {
          price = ticket.price
        }
      }
    })
    return price
  }


  handleTicketTypeChange(seat: string, type: string, price: number) {
    this.ticketService.updateSeatTypeAndPrice( seat, type, price);
  }

  removeTicket(seat: string) {
    this.movieService.removeSeat(seat);
    this.ticketService.removeTicket(seat)
  }

  isSelectedSeatSpecial() {
    return this.specialSeats.includes(this.selected)
  }

  ngOnInit(): void {
    this.selectedTicket = this.ticketService.getTicketType(this.selected)
    this.ticketSelection = this.movieService.getSelectedShow().priceList
  }
}
