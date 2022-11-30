import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { SelectedMovieService } from 'src/app/selected-movie.service';

export interface TicketType {
  seatPostiotion: string;
  type: string;
  price: number;
}

@Component({
  selector: 'app-ticket-selection',
  templateUrl: './ticket-selection.component.html',
  styleUrls: ['./ticket-selection.component.css']
})
export class TicketSelectionComponent implements OnInit {

  @Input() selected:string = ''

  @Output() ticketType = new EventEmitter<TicketType>()


  constructor (private movieService: SelectedMovieService) {}

  ticketSelection = ['Normalny', 'Ulgowy', 'Voucher']
  

  trashCanIcon = faTrashCan;

  selectedTicket = ''

  selectTicketPrice(value: string) {
    if (value === 'Normalny') {
      return 22
    }  else if (value === 'Ulgowy') {
      return 11
    } else {
      return 0
    }
  }

  emitTicketPrice(seatPostiotion: string, ticketType: string, ticketPrice: number) {
    this.ticketType.emit({seatPostiotion: seatPostiotion ,type: ticketType, price: ticketPrice});
  }

  removeTicket(seat:string) {
    this.movieService.removeSeat(seat)
  }

  ngOnInit(): void {
  }

}
