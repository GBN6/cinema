import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControlDirective,
  AbstractControl,
  ValidationErrors,
  EmailValidator,
  FormControl,
} from '@angular/forms';
import { SelectedMovieService } from 'src/app/selected-movie.service';
import { tickets, TicketsService } from 'src/app/tickets.service';
import { Blik, MoviesService } from 'src/app/movies.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/order.service';
import { UserData } from 'src/app/components/user-form/user-form.component';

export interface UserFormValue {
  userName: string
  userLastName: string
  userPhoneNumber?: string
  userMail: string
  userMailConfirmation: string
  userNewsletter: boolean 
  discountCode?: string
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(
    private movieSelectedService: SelectedMovieService,
    private ticketService: TicketsService,
    private orderService: OrderService,
    private router: Router
  ) {
  }

  modalFlag = false;

  codes: Blik[] = []

  date = this.movieSelectedService.selectedDate;

  tickets: tickets[] = [] 

  blikControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(6),
      Validators.maxLength(6),
    ]
  })

  handleModalFlag(status: boolean) {
    this.modalFlag = status
  }

  handleUserDataForm (userFormData: UserData ) {
    this.orderService.addOrder(userFormData, this.ticketService.getTickets())
  }

  submitPayment() {
    this.blikControl.markAllAsTouched();
    if (this.blikControl.invalid) {
      return
    }

    this.orderService.addToReservedSeats(this.ticketService.getTickets())
    this.movieSelectedService.clearSelectedSeats();
    this.ticketService.clearSelectedTickets();
    this.router.navigate(['/summarize']);
  }

  closeModal() {
    this.modalFlag =!this.modalFlag
  }

  getFullPrice() {
    return this.tickets.reduce((total, price) => {
      return (total += price.seat.price);
    }, 0);
  }

  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
  }
}
