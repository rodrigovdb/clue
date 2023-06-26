import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Suspect } from '../interfaces/suspect';
import { Weapon } from '../interfaces/weapon';
import { Room } from '../interfaces/room';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DiceRollerDialogComponent } from '../dice-roller-dialog/dice-roller-dialog.component';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent {
  suspects : Suspect[] = [
    { name: 'Miss Scarlet', color: 'red', checked: false },
    { name: 'Colonel Mustard', color: 'yellow', checked: false },
    { name: 'Mrs. White', color: 'white', checked: false },
    { name: 'Mr. Green', color: 'green', checked: false },
    { name: 'Mrs. Peacock', color: 'blue', checked: false },
    { name: 'Professor Plum', color: 'purple', checked: false }
  ]

  weapons : Weapon[] = [
    { name: 'Candlestick', checked: false },
    { name: 'Knife', checked: false },
    { name: 'Lead Pipe', checked: false },
    { name: 'Revolver', checked: false },
    { name: 'Rope', checked: false },
    { name: 'Wrench', checked: false }
  ]

  rooms : Room[] = [
    { name: 'Ballroom', checked: false },
    { name: 'Billiard Room', checked: false },
    { name: 'Conservatory', checked: false },
    { name: 'Dining Room', checked: false },
    { name: 'Hall', checked: false },
    { name: 'Kitchen', checked: false },
    { name: 'Library', checked: false },
    { name: 'Lounge', checked: false },
    { name: 'Study', checked: false }
  ]

  suspect: Suspect = { name: '', color: '', checked: false };
  weapon: Weapon = { name: '', checked: false };
  room: Room = { name: '', checked: false };

  constructor(
    public resetDialog: MatDialog,
    public diceRollerDialog: MatDialog
    ) {}

  openResetDialog() {
    const dialogRef = this.resetDialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.suspects.forEach(item => item.checked = false);
      this.weapons.forEach(item => item.checked = false);
      this.rooms.forEach(item => item.checked = false);
    });
  }

  openDiceRollerDialog() {
    const dialogRef = this.diceRollerDialog.open(DiceRollerDialogComponent);
  }

  checkSuspect(ob: MatCheckboxChange){
    const emptySuspect = { name: '', color: '', checked: false };

    if(this.suspects.filter(item => item.checked === true).length == (this.suspects.length - 1)){
      this.suspect = this.suspects.find(item => item.checked === false) || emptySuspect;
    }
    else {
      this.suspect = emptySuspect;
    }
  }

  checkWeapon(ob: MatCheckboxChange){
    const emptyWeapon = { name: '', checked: false };

    if(this.weapons.filter(item => item.checked === true).length == (this.weapons.length - 1)){
      this.weapon = this.weapons.find(item => item.checked === false) || emptyWeapon;
    }
    else {
      this.weapon = emptyWeapon;
    }
  }

  checkRoom(ob: MatCheckboxChange){
    const emptyRoom = { name: '', checked: false };

    if(this.rooms.filter(item => item.checked === true).length == (this.rooms.length - 1)){
      this.room = this.rooms.find(item => item.checked === false) || emptyRoom;
    }
    else {
      this.room = emptyRoom;
    }
  }
}
