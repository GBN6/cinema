import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies } from './movies';

export interface Show {
  id: number
  hour: string
  reservedSeats: string[]
  filmId: number
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movieUrl = 'http://localhost:3000/films'

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movies[]>(this.movieUrl)
  }

  getShow(id: number) {
    return this.http.get<Show[]>(`${this.movieUrl}/${id}/show`)
  }
}
