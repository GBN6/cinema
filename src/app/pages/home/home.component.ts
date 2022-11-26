import { Component, OnInit } from '@angular/core';
import { movie } from '../../movies';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies = movie;
  week: Date[] = []

  getDates (n: number) {
    for (let i: number = 0; i < n; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      this.week.push(today)
    }
    console.log(this.week)
  }

  
  constructor() { }



  ngOnInit(): void {
    this.getDates(7)
  }

}
