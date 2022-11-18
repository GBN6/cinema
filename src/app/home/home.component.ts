import { Component, OnInit } from '@angular/core';
import { movie } from '../movies';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dates: string[] = ['18/11', '19/11', '20/11', '21/11', '22/11', '23/11', '24/11']

  today: number = Date.now()

  movies = movie
  constructor() { }

  ngOnInit(): void {
    console.log(movie)
    console.log(this.dates)
  }

}
