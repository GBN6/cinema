import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TicketsService } from 'src/app/tickets.service';
import { newUser } from 'src/app/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ticketsInCart = 0
  cart = faCartShopping;
  user = newUser;

  logIn(event: Event) {
    (event.target as HTMLElement).textContent = newUser.name
    newUser.loggedIn = true;
    console.log(newUser.loggedIn)
  }

  constructor(private ticketService: TicketsService) { }

  ngOnInit(): void {
    // this.ticketsInCart = this.ticketService.getTickets().length
  }
  ngOnChange() {
    this.ticketsInCart = this.ticketService.getTickets().length
    console.log('onchange', this.ticketService)
  }

}
