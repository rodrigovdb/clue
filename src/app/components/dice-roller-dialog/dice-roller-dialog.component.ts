import { Component, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-dice-roller-dialog',
    templateUrl: './dice-roller-dialog.component.html',
    styleUrls: ['./dice-roller-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogTitle, TranslateModule, CdkScrollable, MatDialogContent, MatGridList, MatGridTile, MatDialogActions, MatButton, MatDialogClose]
})
export class DiceRollerDialogComponent implements OnInit {
  dice1 = 0;
  dice2 = 0;

  ngOnInit() {
    this.dice1 = Math.floor(Math.random() * 6) + 1;
    this.dice2 = Math.floor(Math.random() * 6) + 1;
  }
}
