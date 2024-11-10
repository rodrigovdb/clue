import { Component } from '@angular/core';

import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DiceRollerDialogComponent } from '../dice-roller-dialog/dice-roller-dialog.component';

import { EntityService } from '../services/entity.service';
import { MatAccordion } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { PannelComponent } from "../components/pannel/pannel.component";
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

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
  suspects$ = this.entityService.load('suspects');
  weapons$ = this.entityService.load('weapons');
  rooms$ = this.entityService.load('rooms');

  suspect: Entity = { key: '', name: '',checked: false };
  weapon: Entity = { key: '', name: '', checked: false };
  room: Entity = { key: '', name: '', checked: false };

  constructor(
    private entityService: EntityService
  ) {}

  onOpenResetDialog() {}

  onOpenDiceRollerDialog() {}
}
