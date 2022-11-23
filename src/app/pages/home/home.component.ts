import { Component, OnInit } from '@angular/core';
import { movie } from '../../movies';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies = movie;
  instagram = faInstagram;
  youtube = faYoutube;
  facebook = faFacebookF;
  dates: string[] = ['18/11', '19/11', '20/11', '21/11', '22/11', '23/11', '24/11']
  // today: Date = new Date();
  // newDate = new Date(this.today.setDate(this.today.getDate() - 1));
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
