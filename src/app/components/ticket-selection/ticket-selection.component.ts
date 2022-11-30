import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';

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

  // @Output() ticketType = new EventEmitter<TicketType>()

  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService
  ) {}

  ticketSelection = ['Normalny', 'Ulgowy', 'Voucher'];

  trashCanIcon = faTrashCan;

  selectedTicket: string = 'Normalny';
  // this.ticketService.getTicketType(this.selected)

  selectTicketPrice(value: string) {
    if (value === 'Normalny') {
      return 22;
    } else if (value === 'Ulgowy') {
      return 11;
    } else {
      return 0;
    }
  }

  // emitTicketPrice(seatPostiotion: string, ticketType: string, ticketPrice: number) {
  //   this.ticketType.emit({seatPostiotion: seatPostiotion ,type: ticketType, price: ticketPrice});
  // }

  handleTicketTypeChange(seat: string, type: string, price: number) {
    this.ticketService.updateSeatTypeAndPrice(seat, type, price);
  }

  removeTicket(seat: string) {
    this.movieService.removeSeat(seat);
    this.ticketService.removeTicket(seat)
  }

  ngOnInit(): void {
    console.log(this.ticketService.getTicketType(this.selected))
    console.log(this.selected)
  }
}
