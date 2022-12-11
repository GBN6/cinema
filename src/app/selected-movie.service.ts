import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Movies } from 'src/app/movies';
import { Show } from './movies.service';

interface selectedMovie {
  id: number;
  name: string;
  hour: string;
  reservedSeats: string[];
  selectedSeats: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SelectedMovieService {
  selectedDate: string = '';

  private selectedMovie$$ = new ReplaySubject<Movies>(1);
  private selectedShow$$ = new ReplaySubject<Show>(1);

  selectedSeats: string[] = [];

  clearSelectedSeats() {
    this.selectedSeats = []
  }

  getSelectedMovie(): Movies {
    let movie = {
      id: 0,
      img: '',
      title: '',
      genre: '',
      length: '',
      ageRest: '',
      description: '',
      score: '',
      director: '',
      actors: [''],
      boxOff: 0,
      premier: false,
    };
    this.selectedMovie$$.subscribe((response) => {
      movie = response;
    });
    return movie;
  }

  getSelectedShow(): Show {
    let show = {
      filmId: 0,
      hour: '',
      screen: '',
      id: 0,
      reservedSeats: [''],
      priceList: [
        {
          type: '',
          price: 0,
        },
      ],
    };
    this.selectedShow$$.subscribe((response) => {
      show = response;
    });
    return show;
  }

  addSeat(seat: string) {
    this.selectedSeats.push(seat);
  }

  getSelectedSeats(): string[] {
    return this.selectedSeats;
  }

  removeSeat(seat: string) {
    let index = this.selectedSeats.indexOf(seat);
    this.selectedSeats.splice(index, 1);
  }

  addSubjectMovie(item: Movies) {
    this.selectedMovie$$.next(item);
  }
  addSubjectShow(item: Show) {
    this.selectedShow$$.next(item);
  }

  constructor() {}
}
