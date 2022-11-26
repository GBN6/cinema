import { Injectable } from '@angular/core';

interface selectedMovie {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class SelectedMovieService {

  selectedMovie:selectedMovie = {
    id: 0,
    name: ''
  }
  
  selectedHour:string = ''

  selectedDate:string = ''

  constructor() {
    console.log('selectedMovie init!')
   }
}
