import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from './home-movie-card/home-movie-card.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [],
      },
    ]),
    CommonModule,
    MovieCardComponent,
  ],
})
export default class HomeModule {}
