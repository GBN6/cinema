import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Movies } from 'src/app/movies';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}
  userId = 0;
  private subscriptions = new Subscription();
  userMovieWatchList$!: Observable<Movies[]>;
  getIdFromUrl() {
    const sub = this.route.params.subscribe(({ id }) => {
      this.userId = id;
    });
    this.subscriptions.add(sub);
  }

  // getUserWatchList() {
  //   const sub = this.userDataService
  //     .getUser(this.userId)
  //     .subscribe(({ userWishList }) => {
  //       this.userMovieWatchList$ = userWishList;
  //       console.log(userWishList);
  //     });

  //   this.subscriptions.add(sub);
  // }

  ngOnInit(): void {
    this.getIdFromUrl();
    this.userMovieWatchList$ = this.userDataService.getUserWatchList$(
      this.userId
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
