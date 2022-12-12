import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TicketsService } from 'src/app/tickets.service';
import { newUser } from 'src/app/user';
import { LoginService, User } from 'src/app/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ticketsInCart = 0
  cart = faCartShopping;
  user = newUser;

  private subscriptions = new Subscription();

  loggedIn = false
  userLoggedIn: Partial<User> = {} 

  constructor(private ticketService: TicketsService, private loginAuth: LoginService) { }

  getUser() {
    const sub = this.loginAuth.user$.subscribe((response) => {
      this.userLoggedIn = response
    })
    this.subscriptions.add(sub)
  }

  ngOnInit(): void {
    this.loggedIn = this.loginAuth.isUserAuthenticated()
    console.log(this.loggedIn)
    this.loginAuth.user$.subscribe(console.log)
  }

  ngOnChange() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
