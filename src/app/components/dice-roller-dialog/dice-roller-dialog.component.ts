import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-roller-dialog',
  templateUrl: './dice-roller-dialog.component.html',
  styleUrls: ['./dice-roller-dialog.component.scss']
})
export class DiceRollerDialogComponent implements OnInit {
  dice1 = 0;
  dice2 = 0;

  ngOnInit() {
    this.dice1 = Math.floor(Math.random() * 6) + 1;
    this.dice2 = Math.floor(Math.random() * 6) + 1;
  }
}
