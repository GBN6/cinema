import { Component, Input, OnInit } from '@angular/core';
import { Movies } from 'src/app/movies';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-watchlist-movie',
  templateUrl: './watchlist-movie.component.html',
  styleUrls: ['./watchlist-movie.component.css']
})
export class WatchlistMovieComponent implements OnInit {

  @Input() movie: Movies = {} as Movies
  @Input() userId: number = 0

  constructor(private userDataService: UserDataService) { }

  removeMovieFromWatchList() {
    this.userDataService.removeFromWishList(this.userId, this.movie.id)
  }

  ngOnInit(): void {
  }

}
