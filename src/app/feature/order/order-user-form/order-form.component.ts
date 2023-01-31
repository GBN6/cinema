import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export interface UserData {
  isInvoiceNeeded: boolean;
  userName: string;
  userLastName: string;
  userPhoneNumber?: string;
  userMail: string;
  userMailConfirmation: string;
  userInvoiceForm?: UserInvoiceForm;
  userNewsletter: boolean;
  discountCode?: string;
}

export interface UserInvoiceForm {
  userNIP: string;
  userStreet: string;
  userPostCode: string;
  userCity: string;
}

const emailConfirm: ValidatorFn = (control: AbstractControl) => {
  const email = control.get('userMail');
  const confirmEmail = control.get('userMailConfirmation');
  return email?.value === confirmEmail?.value ? null : { emailMismatch: true };
};

@Component({
  selector: 'app-user-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Output() userDataForm = new EventEmitter<UserData>();
  @Output() openModal = new EventEmitter<boolean>();

  userForm = this.fb.group(
    {
      isInvoiceNeeded: this.fb.control(false),
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
      userMailConfirmation: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,7}$'),
        ],
      }),
      userInvoiceForm: this.fb.group({
        userNIP: this.fb.control(
          { disabled: true, value: '' },
          {
            validators: [
              Validators.required,
              Validators.pattern('^[0-9]*$'),
              Validators.minLength(10),
              Validators.maxLength(10),
            ],
          }
        ),
        userStreet: this.fb.control(
          { disabled: true, value: '' },
          {
            validators: [Validators.required, Validators.maxLength(50)],
          }
        ),
        userPostCode: this.fb.control(
          { disabled: true, value: '' },
          {
            validators: [
              Validators.required,
              Validators.pattern('[0-9]{2}-[0-9]{3}'),
            ],
          }
        ),
        userCity: this.fb.control(
          { disabled: true, value: '' },
          {
            validators: [
              Validators.required,
              Validators.pattern('[a-zA-Z ]*'),
              Validators.maxLength(50),
            ],
          }
        ),
      }),
      userNewsletter: this.fb.control(false),
      discountCode: this.fb.control('', {
        validators: [Validators.pattern('^[a-zA-Z0-9]{7}$')],
      }),
    },
    { validators: [emailConfirm] }
  );

  enableInvoiceForm() {
    this.userForm.controls.isInvoiceNeeded.valueChanges.subscribe((value) => {
      if (value) {
        this.userForm.controls.userInvoiceForm.controls.userCity.enable();
        this.userForm.controls.userInvoiceForm.controls.userNIP.enable();
        this.userForm.controls.userInvoiceForm.controls.userPostCode.enable();
        this.userForm.controls.userInvoiceForm.controls.userStreet.enable();
      } else {
        this.userForm.controls.userInvoiceForm.controls.userCity.disable();
        this.userForm.controls.userInvoiceForm.controls.userNIP.disable();
        this.userForm.controls.userInvoiceForm.controls.userPostCode.disable();
        this.userForm.controls.userInvoiceForm.controls.userStreet.disable();
      }
    });
  }

  submitUserForm() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return;
    }
    // handle...
    console.log(this.userForm.value);
    this.userDataForm.emit(this.userForm.getRawValue());
    this.openModal.emit(true);
  }

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {}
}
