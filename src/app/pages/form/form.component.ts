import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private movieService: SelectedMovieService) { }

  title = this.movieService.selectedMovie.name;
  hour = this.movieService.selectedMovie.hour;
  date = this.movieService.selectedDate

  ngOnInit(): void {
  }

}
