import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  constructor() { }

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
  cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  reserved: string[] = ['A2', 'A3', 'F5', 'F1', 'F2','F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
  selected: string[] = [];

  getStatus(seatPos: string){
    if(this.reserved.indexOf(seatPos) !== -1) {
        return 'reserved';
    } else if (this.selected.indexOf(seatPos) !== -1) {
        return 'selected';
    } return 'freeSeat'
}

  getAlphabet(){
    
  }

  ngOnInit(): void {
  }

}
