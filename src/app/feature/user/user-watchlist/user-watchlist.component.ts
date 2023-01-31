import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/feature/user/user-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './user-watchlist.component.html',
  styleUrls: ['./user-watchlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}
  userId = 0;
  private subscriptions = new Subscription();
  userMovieWatchList$ = this.userDataService.userWishList$;
  getIdFromUrl() {
    const sub = this.route.params.subscribe(({ id }) => {
      this.userId = id;
    });
    this.subscriptions.add(sub);
  }

  // getUserWatchList() {
  //   const sub = this.userDataService.userWishList$

  //   this.subscriptions.add(sub);
  // }

  ngOnInit(): void {
    this.getIdFromUrl();
    this.userDataService.getUserWatchList(this.userId);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
