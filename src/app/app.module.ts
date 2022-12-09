import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { FormComponent } from './pages/form/form.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TicketSelectionComponent } from './components/ticket-selection/ticket-selection.component';
import { LoginComponent } from './pages/login/login.component';
import { SummarizeComponent } from './pages/summarize/summarize.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCardComponent,
    SeatsComponent,
    FormComponent,
    FooterComponent,
    NavbarComponent,
    TicketSelectionComponent,
    LoginComponent,
    SummarizeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
