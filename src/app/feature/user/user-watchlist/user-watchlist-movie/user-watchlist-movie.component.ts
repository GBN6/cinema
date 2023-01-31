import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Movies } from 'src/app/feature/home/movies.service';
import { UserDataService } from 'src/app/feature/user/user-data.service';

@Component({
  selector: 'app-watchlist-movie',
  templateUrl: './user-watchlist-movie.component.html',
  styleUrls: ['./user-watchlist-movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchlistMovieComponent implements OnInit {
  @Input() movie: Movies = {} as Movies;
  @Input() userId: number = 0;

  constructor(private userDataService: UserDataService) {}

  removeMovieFromWatchList() {
    this.userDataService.removeFromWishList(this.userId, this.movie.id);
  }

  ngOnInit(): void {}
}
