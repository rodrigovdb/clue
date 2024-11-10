import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {TranslateService} from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SessionService } from './services/session.service';

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
  language = this.sessionService.get('language') || 'en';
  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'pt-BR', name: 'Português do Brasil' },
    { code: 'fr', name: 'Français' },
  ];

  constructor(
    private translate: TranslateService,
    private sessionService: SessionService,
    public resetDialog: MatDialog
  ) {
    translate.setDefaultLang('en');

    translate.use(this.language);
  }

  changeLanguage() {
    const dialogRef = this.resetDialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.translate.use(this.language);
      this.sessionService.set('language', this.language);

      window.location.reload();
    });
  }
}
