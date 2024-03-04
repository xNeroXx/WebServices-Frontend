import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {DialogService} from "../../services/dialog.service";
import {CurrentUserComponent} from "../current-user/current-user.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService, private dialogService: DialogService) {
  }

  get currentUsername() {
    return this.userService.getCurrentUsername();
  }

  ngOnInit() {
    this.userService.loadCurrentUserData();
  }

  logout() {
    this.userService.logout();
  }

  showUserData() {
    this.dialogService.openDialog(CurrentUserComponent);
  }
}
