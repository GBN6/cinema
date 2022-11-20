import { Component, OnInit, Input } from '@angular/core';
import { Movies } from 'src/app/movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any;

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


  constructor() { }

  ngOnInit(): void {
  }

}
