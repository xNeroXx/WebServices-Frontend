import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {RefreshService} from "../../services/refresh.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit, OnDestroy{
  private intervalRefresh?: Subscription;

  constructor(private refreshService: RefreshService, private userService: UserService) {}

  ngOnInit() {
    this.intervalRefresh = interval(30 * 58 * 1000)
      .subscribe(() => {
        if(this.userService.getLoggedIn()){
          this.refreshService.refreshToken();
        }
      })
  }

  ngOnDestroy() {
    this.intervalRefresh?.unsubscribe();
  }

}
