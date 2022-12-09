import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserFormValue } from './pages/form/form.component';

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

  addOrder(item: Partial<UserFormValue>) {
    this.http.post<any>(this.orderUrl, item).subscribe((data) => 
    this.orderId = data.id)
  }
}
