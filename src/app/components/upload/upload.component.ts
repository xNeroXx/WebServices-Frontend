import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatPrefix} from "@angular/material/form-field";

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule, MatPrefix],
})
export class UploadComponent {

}
