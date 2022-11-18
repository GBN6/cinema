import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dates: string[] = []

  today: number = Date.now()

  constructor() { }

  ngOnInit(): void {
    for (let x = 0; x < 7; x++) {
      this.dates.push()
    }
  }

}
