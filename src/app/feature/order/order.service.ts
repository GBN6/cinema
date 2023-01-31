import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './order-user-form/order-form.component';
import { tickets } from '../../tickets.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { Show } from '../home/movies.service';
import { LoginService } from '../auth/login.service';

export interface Order {
  id: number;
  userName: string;
  userLastName: string;
  userMail: string;
  discountCode: string | undefined;
  userPhoneNumber: string | undefined;
  invoice: Invoice[];
  date: string;
  paied: boolean;
  userId?: number;
}

export interface Invoice {
  id: number;
  address: Address[];
  nip: string;
}

export interface Address {
  id: number;
  street: string;
  local: string;
  postcode: string;
  city: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl = 'http://localhost:3000/orders';
  private showUrl = 'http://localhost:3000/show';
  private orderEmail$$ = new ReplaySubject<string>(1);
  private userLoggedIn = false;
  private userId = 0;
  private subscriptions = new Subscription();

  get orderEmail$() {
    return this.orderEmail$$.asObservable();
  }

  orderId?: number = 0;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.getUserStatus();
  }

  getUserId() {
    const sub = this.loginService.user$.subscribe(({ id }) => {
      this.userId = id;
    });

    this.subscriptions.add(sub);
  }

  getUserStatus() {
    const sub = this.loginService.isUserLoggedIn$.subscribe((response) => {
      this.userLoggedIn = response;
    });

    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addOrder(userData: UserData, tickets: tickets[]) {
    const {
      userName,
      userLastName,
      userMail,
      discountCode,
      userPhoneNumber,
      userInvoiceForm,
    } = userData;

    const orderDTO = {
      id: 0,
      userName,
      userLastName,
      userMail,
      discountCode,
      userPhoneNumber,
      userInvoiceForm,
      paiedAt: new Date().toString(),
      ticket: tickets,
    };

    if (this.userLoggedIn) {
      this.getUserId();
      const userOrderDTO = {
        ...orderDTO,
        userId: this.userId,
      };
      this.orderEmail$$.next(userMail);
      console.log(userOrderDTO);

      this.http
        .post<Order>(this.orderUrl, userOrderDTO)
        .subscribe((data) => (this.orderId = data.id));
    } else {
      this.orderEmail$$.next(userMail);
      console.log(orderDTO);

      this.http
        .post<Order>(this.orderUrl, orderDTO)
        .subscribe((data) => (this.orderId = data.id));
    }
  }

  addToReservedSeats(tickets: tickets[]) {
    const copyTickets = [...tickets];
    console.log(copyTickets);
    if (copyTickets.length === 0) return;
    this.getCurrentReservedSeats(copyTickets[0].showId).subscribe(
      ({ reservedSeats }) => {
        this.http
          .patch(`${this.showUrl}/${copyTickets[0].showId}`, {
            reservedSeats: [...reservedSeats, copyTickets[0].seat.positon],
          })
          .subscribe((data) => {
            console.log(data);
            copyTickets.splice(0, 1);
            this.addToReservedSeats(copyTickets);
          });
      }
    );
  }

  private getCurrentReservedSeats(number: number) {
    return this.http.get<Show>(`${this.showUrl}/${number}`);
  }
}
