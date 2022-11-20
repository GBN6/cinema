import { Component, OnInit } from '@angular/core';
import { movie } from '../movies';
import { Movies } from '../movies';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies = movie;
  selectedMovie?: Movies;
  instagram = faInstagram;
  youtube = faYoutube;
  facebook = faFacebookF;
  dates: string[] = ['18/11', '19/11', '20/11', '21/11', '22/11', '23/11', '24/11']


  showMoreInfo(event: Event, movie: Movies) {
    const buttonText = (event.target as HTMLElement).textContent
    if (buttonText === "Więcej") {
      (event.target as HTMLElement).textContent= 'Schowaj'
      this.selectedMovie = movie;
      console.log(this.selectedMovie)
    } else {
      (event.target as HTMLElement).textContent= 'Więcej'
      this.selectedMovie = undefined
    }

  }

  today: number = Date.now()

  
  constructor() { }



  ngOnInit(): void {
    console.log(movie)
    console.log(this.dates)
  }

}
