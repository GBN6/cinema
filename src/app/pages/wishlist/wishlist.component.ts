import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/movies';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userDataService: UserDataService) { }
  private userId = 0;
  private subscriptions = new Subscription
  userMovieWatchList: Movies[] = []

  getIdFromUrl() {
    const sub = this.route.params.subscribe(({ id }) => {
      this.userId = id;
    });
    // console.log(this.route.snapshot.params['id']);
    // console.log(this.route.data);

    this.subscriptions.add(sub);
  }

  getUserWatchList() {
    const sub = this.userDataService.getUser(this.userId).subscribe(({userWishList}) => {
      this.userMovieWatchList = userWishList;
      console.log(userWishList)
    })

    this.subscriptions.add(sub)
  }

  ngOnInit(): void {
    this.getIdFromUrl()
    this.getUserWatchList()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
