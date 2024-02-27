import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButton, MatDivider, RouterLink, MatIconButton, MatIcon]
})
export class SignupComponent {
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  hide = true;

  constructor(private userService: UserService) {}
  /*
    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }

      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
  */
  submit() {
    console.log(this.signupForm.get('firstName')?.value)
    console.log(this.signupForm.get('lastName')?.value)
    console.log(this.signupForm.get('email')?.value)
    console.log(this.signupForm.get('password')?.value)
  }

}
