import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { SelectedSeatService } from 'src/app/selected-seat.service';
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
})
export class SeatsComponent implements OnInit {
  constructor(private movieService: SelectedMovieService, private seatService: SelectedSeatService ) {}

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  reserved = this.movieService.selectedReservedSeats;

  title = this.movieService.selectedMovie.name;
  hour = this.movieService.selectedHour;
  date = this.movieService.selectedDate;

  selected = this.seatService.getSelectedSeats()

  getStatus(seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    return 'freeSeat';
  }

  seatClicked(seatPos: string) {
    let index = this.selected.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1);
    } else {
      //push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1) this.selected.push(seatPos);
    }
    console.log(this.seatService.getSelectedSeats());
  }


  ngOnInit(): void {
    console.log(this.movieService.selectedMovie);
    console.log(this.movieService.selectedReservedSeats);
  }
}
