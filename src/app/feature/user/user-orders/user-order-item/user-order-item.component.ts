import { Component, Input, OnInit } from '@angular/core';
import { UserOrdersTicket } from 'src/app/feature/user/user-data.service';
@Component({
  selector: 'app-ticket-item',
  templateUrl: './user-order-item.component.html',
  styleUrls: ['./user-order-item.component.css'],
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: UserOrdersTicket = {} as UserOrdersTicket;

  constructor() {}

  ngOnInit(): void {}
}
