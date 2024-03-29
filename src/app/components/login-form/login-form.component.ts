import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UserService} from "../../services/user.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButton, MatDivider, RouterLink, MatIcon, MatIconButton
  ]
})
export class LoginFormComponent {
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private userService: UserService) {
  }

  getErrorMessage(field: number) {
    if (field == 0) {
      if (this.loginForm.get('email')?.hasError('required')) {
        return 'Darf nicht leer sein';
      }
      return this.loginForm.get('email')?.hasError('email') ? 'Keine valide Email' : '';
    } else if (field == 1) {
      if (this.loginForm.get('password')?.hasError('required')) {
        return 'Darf nicht leer sein';
      } else if (this.loginForm.get('password')?.hasError('minlength')) {
        return 'Mindestens 8 Zeichen'
      }
      return this.loginForm.get('password')?.hasError('*') ? 'Kein valides Passwort' : '';
    }
    return '';
  }

  submit() {
    this.userService.login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '')
  }


}
