import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { newUser } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinema';
  cart = faCartShopping;
  user = newUser;

  logIn(event: Event) {
    (event.target as HTMLElement).textContent = newUser.name
    newUser.loggedIn = true;
    console.log(newUser.loggedIn)
  }

}
