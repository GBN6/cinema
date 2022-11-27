import { Component, OnInit } from '@angular/core';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
})
export class SeatsComponent implements OnInit {
  constructor(private movieService: SelectedMovieService) {}

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  reserved = this.movieService.selectedReservedSeats;
  selected: string[] = [];

  title = this.movieService.selectedMovie.name;
  hour = this.movieService.selectedHour;
  date = this.movieService.selectedDate;

  trashCanIcon = faTrashCan;

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
    console.log(this.selected);
  }

  // handleTicketPrice(event: any) {
  //   let value = event.value;
  //   switch (value) {
  //     case 'Normalny':
  //       return 22;
  //     case 'Ulgowy':
  //       return 11;
  //     case 'Rodzinny':
  //       return 50;
  //     case 'Voucher':
  //       return 0;
  //     default:
  //       return 22;
  //   }
  // }

  mySelect = null;

  ticketPrice = [
    {
      choice: 'Normalny',
      price: 22
    },
    {
      choice: 'Ulgowy',
      price: 11
    },
    {
      choice: 'Rodzinny',
      price: 50
    },
    {
      choice: 'Voucher',
      price: 0
    },

  ]

  ngOnInit(): void {
    console.log(this.movieService.selectedMovie);
    console.log(this.movieService.selectedReservedSeats);
  }
}
