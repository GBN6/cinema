import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './login.service';

export interface UserOrders {
  id: number
  userName: string
  userLastName: string
  userMail: string
  discountCode: string
  userPhoneNumber: string
  userInvoiceForm: UserOrdersInvoice
  paiedAt: string
  ticket: UserOrdersTicket[]
  userId: number
}

export interface UserOrdersInvoice {
  userNIP: string
  userStreet: string
  userPostCode: string
  userCity: string
}

export interface UserOrdersTicket {
  id: number
  showId: number
  title: string
  date: string
  hour: string
  seat: UserOrdersSeat
}

export interface UserOrdersSeat {
  positon: string
  type: string
  price: number
  special: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  getUser(id: number) {
    return this.http.get<User>(`${this.userUrl}/${id}`)
  }

  getUserOrders(id: number) {
    return this.http.get<UserOrders[]>(`${this.userUrl}/${id}/orders`)
  }
}
