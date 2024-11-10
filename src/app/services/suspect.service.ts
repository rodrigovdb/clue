import { Injectable } from '@angular/core';
import { Suspect } from '../interfaces/suspect';
import { SessionService } from './session.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SuspectService {
  constructor(
    private sessionService: SessionService,
    private translateService: TranslateService
  ) { }

  load(): Suspect[] {
    let suspects: Suspect[] = this.loadFromSession()

    return suspects.length ? suspects : this.initializeSuspects()
  }

  /**
   * Read from session, if current language is the same.
   *
   * @returns 
   */
  private loadFromSession(): Suspect[] {
    return this.sessionService.get('suspects') || []
  }

  /**
   * Read from i18n
   * 
   * @returns Suspect[]
   */
  private initializeSuspects(): Suspect[] {
    let suspects: Suspect[] = []

    this.translateService.get('suspects').subscribe((suspect: any) => {
      for(let key in suspect) {
        suspects.push({ name: suspect[key], key: key, checked: false });
      }
    });

    return suspects
  }
}
