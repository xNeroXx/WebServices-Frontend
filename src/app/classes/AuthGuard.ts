import {filter, map} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {StatusMessageService} from "../services/status-message.service";
import {UserService} from "../services/user.service";

export const authGuard = () => {
  const statusMessageService: StatusMessageService = inject(StatusMessageService);
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  const message: string = 'Login erforderlich';
  //checks if current user is set
  return userService.getLoggedIn().pipe(
    //filters for undefined user
    filter(currentUser => currentUser !== undefined),
    map((currentUser) => {
      if (!currentUser) {
        router.navigateByUrl('/login').then(() => {
            statusMessageService.showStatusMessage(message, 'info');
          }
        );
        return false;
      }
      return true;
    }))
}
