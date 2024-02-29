import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ComponentType} from "@angular/cdk/overlay";


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openDialog(content: ComponentType<any>, data?: any): MatDialogRef<any> {
    if (data === undefined || data === null) {
      return this.dialog.open(content);
    } else {
      return this.dialog.open(content, {data: data});
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

}
