import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { EntityService } from '../../services/entity.service';
import { PannelComponent } from "../pannel/pannel.component";
import { MatDialog } from '@angular/material/dialog';
import { DiceRollerDialogComponent } from '../../dice-roller-dialog/dice-roller-dialog.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

export interface Entity {
  key: string;
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [
    CommonModule,
    MatAccordion,
    MatButtonModule,
    PannelComponent,
    TranslateModule
],
  templateUrl: './guess.component.html',
  styleUrl: './guess.component.scss'
})

export class GuessComponent {
  constructor(
    public diceRollerDialog: MatDialog,
    public resetDialog: MatDialog,
    public entityService: EntityService
  ) {}

  onOpenResetDialog() {
    const dialogRef = this.resetDialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.entityService.clear('suspects');
      this.entityService.clear('weapons');
      this.entityService.clear('rooms');

      window.location.reload();
    });
  }

  onOpenDiceRollerDialog() {
    this.diceRollerDialog.open(DiceRollerDialogComponent);
  }
}
