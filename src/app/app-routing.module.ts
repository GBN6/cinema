import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { SeatsComponent } from './feature/seats/seats.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { SummarizeComponent } from './feature/summarize/summarize.component';
import { UserOrdersComponent } from './feature/user/user-orders/user-orders.component';
import { WishlistComponent } from './feature/user/user-watchlist/user-watchlist.component';
import { FormComponent } from './feature/order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seats', component: SeatsComponent },
  { path: 'form', component: FormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'summarize', component: SummarizeComponent },
  { path: 'my-tickets/:id', component: UserOrdersComponent },
  { path: 'to-watch/:id', component: WishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
