import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/user-data.service';
import { UserOrders } from 'src/app/user-data.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userDataService: UserDataService) {
    this.route.params.subscribe((params) => console.log(params));
    // console.log(this.route.snapshot.params['id']);
    // console.log(this.route.data);
   }

  private subscriptions = new Subscription
  userOrders: UserOrders[] = []

  getUserOrders() {
    const sub = this.userDataService.getUserOrders(this.route.snapshot.params['id']).subscribe((response) => {
      this.userOrders = response
    })
  }


  ngOnInit(): void {
  }

}
