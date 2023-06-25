import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Suspect } from '../interfaces/suspect';
import { Weapon } from '../interfaces/weapon';
import { Room } from '../interfaces/room';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent {
  panelOpenState = false;

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

  suspect: Suspect = {name: '', color: '', checked: false};
  weapon: Weapon = {name: '', checked: false};
  room: Room = {name: '', checked: false};

  checkSuspect(ob: MatCheckboxChange){
    console.log('verifySuspects()', ob.checked);
    console.log(this.suspects.filter(item => item.checked === true).length)
  }
}
