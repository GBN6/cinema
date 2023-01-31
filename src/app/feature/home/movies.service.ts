import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Blik {
  id: number;
  code: number;
}

export interface Hours {
  hour: string;
  reservedSeats: string[];
}

export interface Movies {
  id: number;
  img: string;
  title: string;
  genre: string;
  length: string;
  ageRest: string;
  description: string;
  score: string;
  director: string;
  actors: string[];
  boxOff: number;
  premier: boolean;
}

export interface Show {
  id: number;
  hour: string;
  screen: string;
  reservedSeats: string[];
  priceList: PriceList[];
  filmId: number;
}

export interface PriceList {
  type: string;
  price: number;
}

export interface Screen {
  id: number;
  name: string;
  rows: number;
  colu: number;
  specialSeats: string[];
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private movieUrl = 'http://localhost:3000/films';

  constructor(private http: HttpClient) {}

  getMovies(dateId: number) {
    return this.http.get<Movies[]>(
      `http://localhost:3000/dates/${dateId}/films`
    );
  }

  getShow(id: number) {
    return this.http.get<Show[]>(`${this.movieUrl}/${id}/show`);
  }

  getScreen(name: string) {
    return this.http.get<Screen[]>(`http://localhost:3000/screen?q=${name}`);
  }

  getBlikCodes() {
    return this.http.get<Blik[]>('http://localhost:3000/blik');
  }
}
