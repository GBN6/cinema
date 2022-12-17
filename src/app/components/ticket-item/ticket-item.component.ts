import { Component, Input, OnInit } from '@angular/core';
import { UserOrdersTicket } from 'src/app/user-data.service';
@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: UserOrdersTicket = {} as UserOrdersTicket

  constructor() { }

  ngOnInit(): void {
  }

}
