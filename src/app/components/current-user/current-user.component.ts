import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {CurrentUserData} from "../../interfaces/current-user-data";

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrl: './current-user.component.scss'
})
export class CurrentUserComponent implements OnInit{
  protected currentUserData!: CurrentUserData;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentUserData = this.userService.getUserData();
  }
}
