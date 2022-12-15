import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tickets } from 'src/app/tickets.service';
import { TicketsService } from 'src/app/tickets.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  tickets: tickets[] = [];
  private subscriptions = new Subscription();
  cartStatus: boolean = false;

  constructor(private ticketService: TicketsService) {}

  getSumTotal() {
    let sum = 0;
    this.ticketService.getTickets().forEach((ticket) => {
      sum += ticket.seat.price;
    });
    return sum;
  }

  getCartStatus() {
    const sub = this.ticketService.cartStatus$.subscribe(({ cartOpen }) => {
      this.cartStatus = cartOpen;
    });

    this.subscriptions.add(sub);
  }

  closeCart() {
    this.ticketService.closeCart()
  }

  cartOverlayClass() {
    if (this.cartStatus) {
      return 'open-overlay';
    } else {
      return 'close-overlay';
    }
  }

  cartModal() {
    if (this.cartStatus) {
      return 'open-cart';
    } else {
      return 'close-cart';
    }
  }

  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
    this.getCartStatus();
    console.log(this.tickets);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
