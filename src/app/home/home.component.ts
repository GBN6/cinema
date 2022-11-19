import { Component, OnInit } from '@angular/core';
import { movie } from '../movies';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  instagram = faInstagram;
  youtube = faYoutube;
  facebook = faFacebookF;
  dates: string[] = ['18/11', '19/11', '20/11', '21/11', '22/11', '23/11', '24/11']


  showMoreInfo() {
    const showInfo = document.querySelector<HTMLElement>('.show-info-button');
    const moreInfo = document.querySelector<HTMLElement>('.more-info')

    if (showInfo?.textContent === 'Więcej') {
      showInfo.textContent = 'Schowaj';
      moreInfo!.style.display = 'block';
    } else {
      showInfo!.textContent = 'Więcej';
      moreInfo!.style.display = 'none';
    }

  }

  today: number = Date.now()

  movies = movie
  constructor() { }



  ngOnInit(): void {
    console.log(movie)
    console.log(this.dates)
  }

}
