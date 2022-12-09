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

const emailConfirm: ValidatorFn = (control: AbstractControl) => {
  const email = control.get('userMail')
  const confirmEmail = control.get('userMailConfirmation')
  return email?.value === confirmEmail?.value ? null : {emailMismatch: true} 
};

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
    private fb: NonNullableFormBuilder,
    private moviesService: MoviesService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.userForm.valueChanges.subscribe(console.log);
    this.blikControl.valueChanges.subscribe(console.log)
  }

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
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,7}$'),
      ],
    }),
    userNewsletter: this.fb.control(false),
    userMailConfirmation: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,7}$'),
      ],
    }),
    discountCode: this.fb.control('', {
      validators: [
        Validators.pattern('^[a-zA-Z0-9]{7}$'),
      ],
    }),
  }, {validators: [
    emailConfirm
  ]});

  submitUserForm() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return;
    }
    // handle...
    console.log(this.userForm.value);
    const modal = document.querySelector('#modal') as HTMLElement
    modal.style.display = 'block'

    this.moviesService.getBlikCodes().subscribe((response) => {
      this.codes = response
      console.log(this.codes)
    })
  }

  submitPayment() {
    this.blikControl.markAllAsTouched();
    if (this.blikControl.invalid) {
      return
    }

    this.orderService.addOrder(this.userForm.getRawValue())
    this.router.navigate(['/summarize']);
    console.log(this.blikControl.value)
  }

  closeModal() {
    const modal = document.querySelector('#modal') as HTMLElement
    modal.style.display = 'none'
  }

  getFullPrice() {
    return this.tickets.reduce((total, price) => {
      return (total += price.seat.price);
    }, 0);
  }

  checkBLikCode(code: number ) {
    return this.codes
  }


  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
  }

}
