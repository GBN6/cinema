import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-summarize',
  templateUrl: './summarize.component.html',
  styleUrls: ['./summarize.component.css']
})
export class SummarizeComponent implements OnInit {

  private subscribe = new Subscription();

  email: string = ''

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const sub = this.orderService.orderEmail$.subscribe((response) => {
      this.email = response
    })
    this.subscribe.add(sub)
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe()
  }

}
