import { Component, Input, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { SelectedMovieService } from 'src/app/selected-movie.service';

@Component({
  selector: 'app-ticket-selection',
  templateUrl: './ticket-selection.component.html',
  styleUrls: ['./ticket-selection.component.css']
})
export class TicketSelectionComponent implements OnInit {

  @Input() selected:string = ''

  constructor (private movieService: SelectedMovieService) {}

  ticketSelection = ['Normalny', 'Ulgowy', 'Voucher']
  ticketPrice = 22;

  trashCanIcon = faTrashCan;

  handleTicketPrice(event: any) {
    let value = event.value;
    switch (value) {
      case 'Normalny':
        this.ticketPrice = 22;
        break;
      case 'Ulgowy':
        this.ticketPrice = 11;
        break;
      case 'Voucher':
        this.ticketPrice = 0;
        break;
      default:
        this.ticketPrice = 22;
        break;
    }
  }

  removeTicket(seat:string) {
    this.movieService.removeSeat(seat)
  }

  ngOnInit(): void {
  }

}
