import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Subject } from 'rxjs';

export interface User {
  id: number
  userName: string
  userLastName: string
  userEmail: string
  userPassword: string
  role: string
  userPhoneNumber: string
  userInvoiceDetails: UserInvoiceDetail[]
}

export interface UserInvoiceDetail {
  userNIP: string
  userStreet: string
  userPostCode: string
  userCity: string
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isUserLoggedIn = false
  private userUrl = 'http://localhost:3000/users'
  private user$$ = new ReplaySubject<User>(1)
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<User[]>(this.userUrl)
  }

  getCurrentUser(id: number) {
    return this.http.get<User>(`${this.userUrl}/${id}`)
  }

  get user$() {
    return this.user$$.asObservable()
  }

  setCurrentUser(user: User) {
    this.user$$.next(user)
  }

  userAuthentication() {
    this.isUserLoggedIn = !this.isUserLoggedIn
  }

  isUserAuthenticated() {
    return this.isUserLoggedIn;
  }
}
