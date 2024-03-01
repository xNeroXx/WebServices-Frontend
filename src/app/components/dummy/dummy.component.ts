import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.scss'
})
export class DummyComponent implements OnInit {
  numbersArray: number[] = [];

  ngOnInit() {
    for (let i = 1; i <= 100; i++) {
      this.numbersArray.push(i);
    }
  }
}
