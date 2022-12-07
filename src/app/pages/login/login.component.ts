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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forgotPassword = false
  
  passwordRecover() {
    this.forgotPassword = !this.forgotPassword
  }

  loginForm = this.builder.group({
    userEmail: this.builder.control('', {
      validators: [
        Validators.required
      ]
    }),
    userPassword: this.builder.control('', {
      validators: [
        Validators.required
      ]
    })
  })

  constructor(private builder: NonNullableFormBuilder,) { }

  ngOnInit(): void {
  }

}
