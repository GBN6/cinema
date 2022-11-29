import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
})
export class SeatsComponent implements OnInit {
  constructor(private movieService: SelectedMovieService) {}

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];


  reserved = this.movieService.selectedMovie.reservedSeats;


  id = this.movieService.selectedMovie.id
  title = this.movieService.selectedMovie.name;
  hour = this.movieService.selectedMovie.hour;
  date = this.movieService.selectedDate

  selected = this.movieService.selectedMovie.selectedSeats

  getStatus(seatPos: string) {
    if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    return 'freeSeat';
  }

  seatClicked(seatPos: string, id: number, hour: string) {
    let index = this.selected.indexOf(seatPos);
    if (index !== -1) {
      // seat already selected, remove
      this.movieService.removeSeat(seatPos)
    } else {
      //push to selected array only if it is not reserved
      if (this.reserved.indexOf(seatPos) === -1) {
        this.movieService.addSeat(seatPos);
        this.movieService.addSavedSeats({id, hour, seatPos})
      } 
    }
    console.log(this.movieService.getSavedSeats())
    console.log(this.movieService.selectedMovie.selectedSeats)
  }


  ngOnInit(): void {
  }
}
