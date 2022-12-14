import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { FormComponent } from './pages/form/form.component';
import { LoginComponent } from './pages/login/login.component';
import { SummarizeComponent } from './pages/summarize/summarize.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'seats', component: SeatsComponent },
  {path: 'form', component: FormComponent },
  {path: 'login', component: LoginComponent},
  {path: 'summarize', component: SummarizeComponent},
  {path: 'my-tickets/:id', component: UserOrdersComponent},
  {path: 'to-watch/:id', component: WishlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
