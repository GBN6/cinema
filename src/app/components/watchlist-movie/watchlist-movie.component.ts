import { Component, Input, OnInit } from '@angular/core';
import { Movies } from 'src/app/movies';

@Component({
  selector: 'app-watchlist-movie',
  templateUrl: './watchlist-movie.component.html',
  styleUrls: ['./watchlist-movie.component.css']
})
export class WatchlistMovieComponent implements OnInit {

  @Input() movie: Movies = {} as Movies

  constructor() { }

  ngOnInit(): void {
  }

}
