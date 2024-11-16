import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Entity } from '../components/guess/guess.component';

export type EntityType = 'suspects' | 'weapons' | 'rooms';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  constructor(
    private sessionService: SessionService,
    private translateService: TranslateService
  ) { }

  load(who: EntityType) {
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
    );
  }

  clear(who: EntityType) {
    const items = this.loadFromSession(who).map(item => ({ ...item, checked: false }));

    this.persist(who, items)
  }

  toggleItem(who: EntityType, entity: Entity) {
    const items = this.loadFromSession(who)

    items.forEach(item => {
      if(item.key === entity.key) {
        item.checked = entity.checked;
      }
    })

    this.persist(who, items);
  }

  persist(who: EntityType, items: Entity[]) {
    this.sessionService.set(who, items.map(item => ({ key: item.key, checked: item.checked })));
  }

  private loadFromSession(who: EntityType): Entity[] {
    return this.sessionService.get(who) || []
  }
}
