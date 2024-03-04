import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatIcon} from "@angular/material/icon";
import {SignupData} from "../../interfaces/signup-data";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButton, MatDivider, RouterLink, MatIconButton, MatIcon]
})
export class SignupComponent {
  hide = true;
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),

    street: new FormControl('', [Validators.required, Validators.minLength(3)]),
    house_number: new FormControl(null, [Validators.required]),
    postal_code: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    country: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private userService: UserService) {
  }

  getErrorMessage(field: string, minLength: number): string {
    if (this.signupForm.get(field)?.hasError('email') || this.signupForm.get(field)?.hasError('pattern')) {
      return 'Keine valide Email';
    }
    if (this.signupForm.get(field)?.hasError('required')) {
      return 'Darf nicht leer sein';
    }
    return this.signupForm.get(field)?.hasError('minlength') ? `Mindestens ${minLength} Zeichen` : '';

  }

  submit() {
    let temp: SignupData = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      password: 'string',
      username: 'string',
      address: {
        street: 'string',
        house_number: 0,
        postal_code: 'string',
        city: 'string',
        country: 'string'
      }
    };
    temp.first_name = this.signupForm.value.firstName ?? '';
    temp.last_name = this.signupForm.value.lastName ?? '';
    temp.email = this.signupForm.value.email ?? '';
    temp.password = this.signupForm.value.password ?? '';
    temp.username = this.signupForm.value.username ?? '';

    temp.address.street = this.signupForm.value.street ?? '';
    temp.address.house_number = this.signupForm.value.house_number ?? 0;
    temp.address.postal_code = <string>this.signupForm.value.postal_code ?? '';
    temp.address.city = this.signupForm.value.city ?? '';
    temp.address.country = this.signupForm.value.country ?? '';

    this.userService.signup(temp);
  }
}
