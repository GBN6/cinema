import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { SelectedMovieService } from 'src/app/feature/home/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';
import { PriceList } from 'src/app/feature/home/movies.service';

export interface TicketType {
  seatPostiotion: string;
  type: string;
  price: number;
}

@Component({
  selector: 'app-ticket-selection',
  templateUrl: './seat-ticket.component.html',
  styleUrls: ['./seat-ticket.component.css'],
})
export class TicketSelectionComponent implements OnInit {
  @Input() selected: string = '';
  @Input() index: number = 0;
  @Input() specialSeats: string[] = [];

  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService
  ) {}

  ticketsTyped: boolean = false;
  ticketSelection: PriceList[] = [];

  trashCanIcon = faTrashCan;

  selectedTicket: string = '';

  selectTicketPrice(value: string) {
    let price = 0;
    this.ticketSelection.forEach((ticket) => {
      if (ticket.type === value) {
        if (this.isSelectedSeatSpecial()) {
          price = ticket.price + 5;
        } else {
          price = ticket.price;
        }
      }
    });
    return price;
  }

  removeTicket(seat: string) {
    this.movieService.removeSeat(seat);
    this.ticketService.removeTicket(seat);
  }

  handleTicketTypeChange(seat: string, type: string, price: number) {
    this.ticketService.updateSeatTypeAndPrice(seat, type, price);
  }

  isSelectedSeatSpecial() {
    return this.specialSeats.includes(this.selected);
  }

  ngOnInit(): void {
    this.ticketSelection = this.movieService.getSelectedShow().priceList;
    this.selectedTicket = this.ticketService.getTicketType(this.selected);
  }
}
