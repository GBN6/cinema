import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private movieService: SelectedMovieService, private ticketService: TicketsService ) { }

  // title = this.movieService.selectedMovie.name;
  // hour = this.movieService.selectedMovie.hour;
  date = this.movieService.selectedDate

  tickets = this.ticketService.getTickets();

  ngOnInit(): void {
  }

}
