import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies } from './movies';
import { Hours } from './movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movieUrl = 'http://localhost:3000/films'

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movies[]>(this.movieUrl)
  }
}
