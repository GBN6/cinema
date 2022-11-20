import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinema';
  loggedIn: boolean = false
  cart = faCartShopping;

  logIn(event: Event) {
    (event.target as HTMLElement).textContent = 'Grzegorz'
    this.loggedIn = true;
  }

}
