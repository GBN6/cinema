import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeatsComponent } from './feature/seats/seats.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TicketSelectionComponent } from './feature/seats/seat-ticket/seat-ticket.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { SummarizeComponent } from './feature/summarize/summarize.component';
import { UserFormComponent } from './feature/order/order-user-form/order-form.component';
import { CartItemComponent } from './feature/user/user-cart/user-cart-item/user-cart-item.component';
import { UserOrdersComponent } from './feature/user/user-orders/user-orders.component';
import { TicketItemComponent } from './feature/user/user-orders/user-order-item/user-order-item.component';
import { WatchlistMovieComponent } from './feature/user/user-watchlist/user-watchlist-movie/user-watchlist-movie.component';
import { WishlistComponent } from './feature/user/user-watchlist/user-watchlist.component';
import { CartComponent } from './feature/user/user-cart/user-cart.component';
import { FormComponent } from './feature/order/order.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SeatsComponent,
    FormComponent,
    FooterComponent,
    NavbarComponent,
    TicketSelectionComponent,
    LoginComponent,
    SummarizeComponent,
    UserFormComponent,
    CartComponent,
    CartItemComponent,
    UserOrdersComponent,
    TicketItemComponent,
    WishlistComponent,
    WatchlistMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// RouterModule.forRoot([
//   {
//     path: '',
//     children: [
//       {
//         path: '',
//         loadChildren: () => import('./feature/home/home.module')
//       },
//       {
//         path: '**',
//       },
//     ],
//   },
// ]),
