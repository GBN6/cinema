import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserFormValue } from './pages/form/form.component';
import { UserData } from './components/user-form/user-form.component';
import { tickets } from './tickets.service';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';
import { Show } from './movies.service';

export interface Order {
  id: number;
  userName: string;
  userLastName: string;
  userEmail: string;
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

  get orderEmail$() {
    return this.orderEmail$$.asObservable();
  }

  orderId?: number = 0;

  constructor(private http: HttpClient) {}

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

    this.orderEmail$$.next(userMail);
    console.log(orderDTO)

    this.http
      .post<any>(this.orderUrl, orderDTO)
      .subscribe((data) => (this.orderId = data.id));
  }

  addToReservedSeats(tickets: tickets[]) {
    let copyTickets = [...tickets];
    if (copyTickets.length === 0) return;
    this.getCurrentReservedSeats(copyTickets[0].showId).subscribe(
      ({ reservedSeats }) => {
        this.http
          .patch(`${this.showUrl}/${copyTickets[0].showId}`, {
            reservedSeats: [...reservedSeats, copyTickets[0].seat.positon],
          })
          .subscribe();
        copyTickets.splice(0, 1)
        this.addToReservedSeats(copyTickets)
      }
    );
  }

  private getCurrentReservedSeats(number: number) {
    return this.http.get<Show>(`${this.showUrl}/${number}`);
  }
}


// {
//   "id": 0,
//   "userName": "",
//   "userLastName": "",
//   "userEmail": "",
//   "invoice": [
//     {
//       "id": 0,
//       "address": [
//         {
//           "id": 0,
//           "street": "",
//           "local": "",
//           "postcode": "",
//           "city": ""
//         }
//       ],
//       "nip": ""
//     }
//   ],
//   "date": "",
//   "paied": true,
//   "userId": 0
// }
