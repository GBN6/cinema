import { Component, Input, OnInit } from '@angular/core';
import { tickets } from 'src/app/tickets.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TicketsService } from 'src/app/tickets.service';
import { SelectedMovieService } from 'src/app/selected-movie.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() ticket: tickets = {} as tickets
  trashCan = faTrashCan

  constructor(private ticketService: TicketsService, private selectedMovieService: SelectedMovieService) { }

  ngOnInit(): void {
    console.log(this.ticket)
  }

  removeTicketFromCart() {
    this.ticketService.removeTicket(this.ticket.seat.positon)
    this.selectedMovieService.removeSeat(this.ticket.seat.positon);
  }

}
