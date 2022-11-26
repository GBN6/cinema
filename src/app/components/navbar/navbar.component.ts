import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { newUser } from 'src/app/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cart = faCartShopping;
  user = newUser;

  logIn(event: Event) {
    (event.target as HTMLElement).textContent = newUser.name
    newUser.loggedIn = true;
    console.log(newUser.loggedIn)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
