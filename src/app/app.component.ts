import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private ticketService: TicketsService){}
  cartStatus: boolean = false
  private subscriptions = new Subscription

  getCartStatus() {
    const sub = this.ticketService.cartStatus$.subscribe(({cartOpen}) => {
      this.cartStatus = cartOpen
    })

    this.subscriptions.add(sub)
  }

  ngOnInit(): void {
    this.getCartStatus()
    // this.router.navigate([''])
  }

}
