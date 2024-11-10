import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { TranslateService } from '@ngx-translate/core';
import { Suspect } from '../interfaces/suspect';
import { Weapon } from '../interfaces/weapon';
import { Room } from '../interfaces/room';
import { combineLatest, map, Observable } from 'rxjs';
import { Entity } from '../guess/guess.component';

type entityType = 'suspects' | 'weapons' | 'rooms';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor(
    private sessionService: SessionService,
    private translateService: TranslateService
  ) { }

  load(who: entityType) {
    return this.translateService.get(who).pipe(
      map((items) => {
        const sessionItems = this.loadFromSession(who);
        const response = [];

        for(let key in items) {
          const checked = sessionItems.find(sessionItem => sessionItem.key === key)?.checked || false;
          response.push({ name: items[key], key, checked });
        }

        this.persist(who, response);

        return response
      })
    )
  }

  check(who: entityType, key: string) {
    const items = this.loadFromSession(who);
    const item = items.find(item => item.key === key);

    if(item) {
      item.checked = !item.checked;
      this.persist(who, items);
    }
  }

  persist(who: entityType, items: Entity[]) {
    this.sessionService.set(who, items.map(item => ({ key: item.key, checked: item.checked })));
  }

  private loadFromSession(who: entityType): Entity[] {
    return this.sessionService.get(who) || []
  }
}
