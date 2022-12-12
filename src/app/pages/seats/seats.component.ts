import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';
import { MoviesService, Show } from 'src/app/movies.service';
import { Screen } from 'src/app/movies.service';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
})
export class SeatsComponent implements OnInit {
  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService,
    private moviesService: MoviesService
  ) {}

  date = this.movieService.selectedDate;
  selected = this.movieService.selectedSeats;

  movie = this.movieService.getSelectedMovie();
  show = this.movieService.getSelectedShow();

  screen: Screen = {
    colu: 0,
    id: 0,
    name: '',
    rows: 0,
    specialSeats: []
  };

  rows: string[] = [];
  cols: number[] = [];

  styleGrid(number: number) {
    return { 'grid-template-columns': `repeat(${number}, 1fr)` };
  }

  getStatus(seatPos: string) {
    if (this.show.reservedSeats.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    } else if (this.screen.specialSeats.indexOf(seatPos) !== -1) {
      return 'special';
    } 
    return 'freeSeat';
  }

  // else if (this.screen.biggerSeats.indexOf(seatPos) !== -1) {
  //   return 'bigger';
  // }

  seatClicked(seatPos: string, id: number, hour: string, title: string) {
    let index = this.selected.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.movieService.removeSeat(seatPos);
      this.ticketService.removeTicket(seatPos);
    } else {
      //push to selected array only if it is not reserved
      if (this.show.reservedSeats.indexOf(seatPos) === -1) {
        if (this.screen.specialSeats.indexOf(seatPos) !== -1) {
          this.movieService.addSeat(seatPos);
          this.ticketService.addTicket({
            id: Math.random(),
            showId: this.show.id,
            title: title,
            date: this.date,
            hour: hour,
            seat: { positon: seatPos, type: this.show.priceList[0].type, price: this.show.priceList[0].price + 5, special: true },
          });
        } else {
          this.movieService.addSeat(seatPos);
          this.ticketService.addTicket({
            id: Math.random(),
            showId: this.show.id,
            title: title,
            date: this.date,
            hour: hour,
            seat: { positon: seatPos, type: this.show.priceList[0].type, price: this.show.priceList[0].price, special: false },
          });
        }
      }
      console.log(this.ticketService.getTickets());
    }
  }

  ngOnInit(): void {
    this.moviesService
      .getScreen(this.show.screen)
      .pipe(
        tap((item) => item),
        mergeMap((item) => item)
      )
      .subscribe((item) => {
        this.screen = item;
        this.rows = [...Array(this.screen.rows).keys()].map((i) =>
          String.fromCharCode(i + 65)
        );
        this.cols = [...Array(this.screen.colu).keys()].map((i) => i + 1);
      });
  }

  ngOnDestroy() {}
}
