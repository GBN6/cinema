import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserFormValue } from './pages/form/form.component';
import { UserData } from './components/user-form/user-form.component';
import { tickets } from './tickets.service';

export interface Order {
  id: number
  userName: string
  userLastName: string
  userEmail: string
  invoice: Invoice[]
  date: string
  paied: boolean
  userId?: number
}

export interface Invoice {
  id: number
  address: Address[]
  nip: string
}

export interface Address {
  id: number
  street: string
  local: string
  postcode: string
  city: string
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'http://localhost:3000/orders'
  orderId? :number = 0

  constructor(private http: HttpClient) { }

  addOrder(userData: UserData, tickets: tickets[] ) {

    const { userName, userLastName, userMail, discountCode, userPhoneNumber, userInvoiceForm } = userData

    const orderDTO = {
      id: 0,
      userName,
      userLastName,
      userMail,
      discountCode,
      userPhoneNumber,
      userInvoiceForm,
      paiedAt: new Date().toString(),
      ticket: tickets
    }

    this.http.post<any>(this.orderUrl, orderDTO).subscribe((data) => 
    this.orderId = data.id)
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