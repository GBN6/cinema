import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, FormBuilder, Validators } from '@angular/forms';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(
    private movieService: SelectedMovieService,
    private ticketService: TicketsService,
    private fb: NonNullableFormBuilder
  ) {}

  date = this.movieService.selectedDate;

  tickets = this.ticketService.getTickets();

  userForm = this.fb.group({
    userName: this.fb.control('', {
      validators: [
        Validators.required
      ]
    }),
    userLastName: this.fb.control('', {
      validators: [
        Validators.required
      ]
    }),
    userPhoneNumber: this.fb.control(''),
    userMail: this.fb.control('', {
      validators: [
        Validators.required
      ]
    }),
    userMailConfirmation: this.fb.control('', {
      validators: [
        Validators.required
      ]
    })
  })

  getFullPrice() {
    return this.tickets.reduce((total, price) => {
      return (total += price.seat.price);
    }, 0);
  }

  ngOnInit(): void {}
}
