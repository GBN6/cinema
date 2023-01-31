import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [],
      },
    ]),
    CommonModule,
  ],
})
export default class HomeModule {}
