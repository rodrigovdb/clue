import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SessionService } from './services/session.service';
import { MatToolbar } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface Language {
  code: string;
  name: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [MatToolbar, TranslateModule, FormsModule, NgFor, RouterOutlet]
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
    public confirmDialog: MatDialog
  ) {
    translate.setDefaultLang('en');

    translate.use(this.language);
  }

  changeLanguage() {
    this.translate.use(this.language);
    this.sessionService.set('language', this.language);

    window.location.reload();
  }
}
