import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  showStatusMessage(message: string, type: string = 'info') {
    this.snackBar.open(message, 'Schließen', {
      duration: 3000,
      panelClass: 'Snackbar-' + type,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
