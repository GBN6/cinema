import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/login.service';
import { BehaviorSubject, map } from 'rxjs';
import { Movies } from '../home/movies.service';

export interface UserOrders {
  id: number;
  userName: string;
  userLastName: string;
  userMail: string;
  discountCode: string;
  userPhoneNumber: string;
  userInvoiceForm: UserOrdersInvoice;
  paiedAt: string;
  ticket: UserOrdersTicket[];
  userId: number;
}

export interface UserOrdersInvoice {
  userNIP: string;
  userStreet: string;
  userPostCode: string;
  userCity: string;
}

export interface UserOrdersTicket {
  id: number;
  showId: number;
  title: string;
  date: string;
  hour: string;
  screen: string;
  seat: UserOrdersSeat;
}

export interface UserOrdersSeat {
  positon: string;
  type: string;
  price: number;
  special: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userUrl = 'http://localhost:3000/users';
  private userWishList$$ = new BehaviorSubject<Movies[]>([]);

  constructor(private http: HttpClient) {}

  get userWishList$() {
    return this.userWishList$$.asObservable();
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  getUserOrders(id: number) {
    return this.http.get<UserOrders[]>(`${this.userUrl}/${id}/orders`);
  }

  getUserWatchList(userId: number) {
    this.getUser(userId).subscribe(({ userWishList }) => {
      this.userWishList$$.next(userWishList);
    });
  }

  isMovieInWishList(userId: number, movieId: number) {
    return this.getUser(userId).pipe(
      map(({ userWishList }) => {
        return userWishList.some((movie) => {
          return movie.id === movieId;
        });
      })
    );
  }

  removeFromWishList(userId: number, movieId: number) {
    this.getUser(userId).subscribe(({ userWishList }) => {
      const newWishList = userWishList.filter((movie) => {
        return movie.id !== movieId;
      });
      console.log(newWishList);
      this.http
        .patch(`${this.userUrl}/${userId}`, { userWishList: [...newWishList] })
        .subscribe(() => {
          this.userWishList$$.next(newWishList);
        });
    });
  }

  addMovieToWishlist(userId: number, movie: Movies) {
    this.getUser(userId).subscribe(({ userWishList }) => {
      this.http
        .patch(`${this.userUrl}/${userId}`, {
          userWishList: [...userWishList, movie],
        })
        .subscribe();
    });
  }
}
