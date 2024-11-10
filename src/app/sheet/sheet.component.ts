import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Suspect } from '../interfaces/suspect';
import { Weapon } from '../interfaces/weapon';
import { Room } from '../interfaces/room';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DiceRollerDialogComponent } from '../dice-roller-dialog/dice-roller-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '../services/session.service';import { SuspectService } from '../services/suspect.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit{
  suspects : Suspect[] = []
  weapons : Weapon[] = []
  rooms : Room[] = []

  suspect: Suspect = { key: '', name: '',checked: false };
  weapon: Weapon = { name: '', checked: false };
  room: Room = { name: '', checked: false };

  constructor(
    public translateService: TranslateService,
    public resetDialog: MatDialog,
    public diceRollerDialog: MatDialog,
    private suspectService: SuspectService
    ) {}

  ngOnInit(): void {
    this.suspects = this.suspectService.load()
    this.initializeWeapons()
    this.initializeRooms()
  }

  openResetDialog() {
    const dialogRef = this.resetDialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.suspects.forEach(item => item.checked = false);
      this.weapons.forEach(item => item.checked = false);
      this.rooms.forEach(item => item.checked = false);

      this.suspect = { key: '', name: '',checked: false };
      this.weapon = { name: '', checked: false };
      this.room = { name: '', checked: false };
    });
  }

  openDiceRollerDialog() {
    const dialogRef = this.diceRollerDialog.open(DiceRollerDialogComponent);
  }

  checkSuspect(ob: MatCheckboxChange){
    const emptySuspect = { key: '', name: '', checked: false };

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

  private initializeWeapons() {
    this.translateService.get('weapons').subscribe((weapon: any) => {
      for(let key in weapon) {
        this.weapons.push({ name: weapon[key], checked: false });
      }
    });
  }
  private initializeRooms() {
    this.translateService.get('rooms').subscribe((room: any) => {
      for(let key in room) {
        this.rooms.push({ name: room[key], checked: false });
      }
    });
  }
}
