import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Movies } from 'src/app/feature/home/movies.service';

export interface User {
  id: number;
  userName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  role: string;
  userPhoneNumber: string;
  userInvoiceDetails: UserInvoiceDetail[];
  userWishList: Movies[];
}

export interface UserInvoiceDetail {
  userNIP: string;
  userStreet: string;
  userPostCode: string;
  userCity: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isUserLoggedIn$$ = new BehaviorSubject<boolean>(false);
  private userUrl = 'http://localhost:3000/users';
  private user$$ = new BehaviorSubject<User>({} as User);
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  getCurrentUser(id: number) {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  get isUserLoggedIn$() {
    return this.isUserLoggedIn$$.asObservable();
  }

  get user$() {
    return this.user$$.asObservable();
  }

  setCurrentUser(user: User) {
    this.user$$.next(user);
  }

  userLogout() {
    this.isUserLoggedIn$$.next(false);
    this.user$$.next({} as User);
  }

  userAuthentication() {
    this.isUserLoggedIn$$.next(true);
  }
}
