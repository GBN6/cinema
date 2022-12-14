import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TicketsService } from 'src/app/tickets.service';
import { LoginService, User } from 'src/app/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ticketsInCart = 0;
  cart = faCartShopping;

  private subscriptions = new Subscription();

  loggedIn = false;
  userLoggedIn: Partial<User> = {};

  constructor(
    private ticketService: TicketsService,
    private loginService: LoginService
  ) {}

  getUser() {
    const sub = this.loginService.user$.subscribe((response) => {
      this.userLoggedIn = response;
    });
    this.subscriptions.add(sub);
  }

  getLoginStatus() {
    const sub = this.loginService.isUserLoggedIn$.subscribe((response) => {
      this.loggedIn = response;
    });
    this.subscriptions.add(sub);
  }

  getTicketsAmmount() {
    const sub = this.ticketService.ticketAmount$.subscribe(
      ({ ticketsAmount }) => {
        this.ticketsInCart = ticketsAmount;
      }
    );
    this.subscriptions.add(sub);
  }

  logoutUser() {
    this.loginService.userLogout();
  }

  ngOnInit(): void {
    this.getUser();
    this.getLoginStatus();
    this.getTicketsAmmount();
  }

  ngOnChange() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
