import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/user-data.service';
import { UserOrders } from 'src/app/user-data.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userDataService: UserDataService
  ) {}

  private userId = 0;
  private subscriptions = new Subscription();
  userOrders: UserOrders[] = [];

  getIdFromUrl() {
    const sub = this.route.params.subscribe(({ id }) => {
      this.userId = id;
    });
    // console.log(this.route.snapshot.params['id']);
    // console.log(this.route.data);

    this.subscriptions.add(sub);
  }

  getOrders() {
    const sub = this.userDataService.getUserOrders(this.userId).subscribe(
      (response) => {
        this.userOrders = response;
        console.log(this.userOrders)
      });
    this.subscriptions.add(sub);
  }

  ngOnInit(): void {
    this.getIdFromUrl();
    this.getOrders();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
