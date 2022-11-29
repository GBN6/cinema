import { Component, Input, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ticket-selection',
  templateUrl: './ticket-selection.component.html',
  styleUrls: ['./ticket-selection.component.css']
})
export class TicketSelectionComponent implements OnInit {

  @Input() selected:string = ''

  mySelect = null;

  ticketSelection = ['Normalny', 'Ulgowy', 'Voucher']
  ticketPrice = 22;

  trashCanIcon = faTrashCan;

  handleTicketPrice(event: any) {
    let value = event.value;
    switch (value) {
      case 'Normalny':
        this.ticketPrice = 22;
        break;
      case 'Ulgowy':
        this.ticketPrice = 11;
        break;
      case 'Voucher':
        this.ticketPrice = 0;
        break;
      default:
        this.ticketPrice = 22;
        break;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
