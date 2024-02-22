import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
})
export class UploadComponent {

}
