import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { MoviesService } from 'src/app/movies.service';
import { Movies } from '../../movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movies[] = []
  week: Date[] = []
  clickedIndex = 0;

  getDates (n: number) {
    for (let i: number = 0; i < n; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      this.week.push(today)
    }
  }
  changeState(index: number) {
    this.clickedIndex = index;
  }

  
  constructor(private movieService: SelectedMovieService, private moviesService: MoviesService) { }


  ngOnInit(): void {

    this.moviesService.getMovies().subscribe(response => {
      this.movies = response;
    })

    this.getDates(7)
    this.movieService.selectedDate = (this.week[0]).toLocaleDateString('en-GB');
  }

}
