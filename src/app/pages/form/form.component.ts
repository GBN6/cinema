import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { TicketsService } from 'src/app/tickets.service';

// const emailChecker = (form: FormGroup): ValidatorFn => {
//   const email = form.get('email').value;
//   const confirm = form.get('confirm').value;

//   return email === confirm ? null : { emailConfirm: 'Email confirm mismatch' };
// };

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
  ) {
    this.userForm.valueChanges.subscribe(console.log);
  }

  date = this.movieService.selectedDate;

  tickets = this.ticketService.getTickets();

  userForm = this.fb.group({
    userName: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.maxLength(50),
      ],
    }),
    userLastName: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.maxLength(50),
      ],
    }),
    userPhoneNumber: this.fb.control('', {
      validators: [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9),
        Validators.maxLength(9),
      ],
    }),
    userMail: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    }),
    userMailConfirmation: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    }),
    discountCode: this.fb.control('', {
      validators: [
        Validators.pattern('^[a-zA-Z0-9]{7}$'),
      ],
    }),
  });

  getFullPrice() {
    return this.tickets.reduce((total, price) => {
      return (total += price.seat.price);
    }, 0);
  }

  ngOnInit(): void {}
}
