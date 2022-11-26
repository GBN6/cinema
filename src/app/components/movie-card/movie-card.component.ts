import { Component, OnInit, Input } from '@angular/core';
import { Movies } from 'src/app/movies';
import { newUser } from 'src/app/user';
import { SelectedMovieService } from 'src/app/selected-movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any;
  user = newUser;
  selectedMovie?: Movies;

  showMoreInfo(event: Event, movie: Movies) {
    const buttonText = (event.target as HTMLElement).textContent
    if (buttonText === "Więcej") {
      (event.target as HTMLElement).textContent= 'Schowaj'
      this.selectedMovie = movie;
    } else {
      (event.target as HTMLElement).textContent= 'Więcej'
      this.selectedMovie = undefined
    }
  }


  constructor(private movieService: SelectedMovieService) { }

  handleSelectedMovie(movie: {id:number, name: string}, hour:string) {
    this.movieService.selectedMovie = movie;
    this.movieService.selectedHour = hour;
  }

  ngOnInit(): void {
  }

}
