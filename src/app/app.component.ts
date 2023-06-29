import { Component, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {TranslateService} from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@Injectable()
export class AppComponent {
  language = this.getData('language') || 'en';

  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'pt-BR', name: 'Português do Brasil' },
    { code: 'fr', name: 'Français' },
  ];

  constructor(
    private translate: TranslateService,
    public resetDialog: MatDialog
  ) {
    translate.setDefaultLang('en');

    translate.use(this.language);
  }

  changeLanguage() {
    const dialogRef = this.resetDialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.translate.use(this.language);
      this.saveData('language', this.language);

      window.location.reload();
    });
  }

  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    if(data === null) return null;
    return JSON.parse(data);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }
  
}
