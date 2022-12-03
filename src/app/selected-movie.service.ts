import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Movies } from 'src/app/movies';
import { Show } from './movies.service';

interface selectedMovie {
  id: number;
  name: string;
  hour: string;
  reservedSeats: string[]
  selectedSeats: string[]
}


@Injectable({
  providedIn: 'root'
})
export class SelectedMovieService {
  selectedDate: string = ''

  selectedMovie$$ = new ReplaySubject<Movies>(1)
  selectedShow$$ = new ReplaySubject<Show>(1)

  selectedMovie:selectedMovie = {
    id: 0,
    name: '',
    hour: '',
    reservedSeats: [],
    selectedSeats: []
  }

  addSeat(seat: string) {
    this.selectedMovie.selectedSeats.push(seat)
  }

  getSelectedSeats(): string[] {
    return this.selectedMovie.selectedSeats
  }

  removeSeat(seat: string) {
    let index = this.selectedMovie.selectedSeats.indexOf(seat);
    this.selectedMovie.selectedSeats.splice(index, 1);
  }

  addSubjectMovie(item: Movies) {
    this.selectedMovie$$.next(item) 
  }
  addSubjectShow(item: Show){
    this.selectedShow$$.next(item)
  }

  constructor() {
   }
}
