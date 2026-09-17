import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { Entity } from 'src/app/components/guess/guess.component';
import { EntityRowComponent } from '../entity-row/entity-row.component';
import { EntityService, EntityType } from 'src/app/services/entity.service';
import { map, Subject } from 'rxjs';
import { SessionItem, SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-pannel',
  imports: [
    CommonModule,
    MatExpansionModule,
    TranslateModule,
    EntityRowComponent,
  ],
  templateUrl: './pannel.component.html',
  styleUrl: './pannel.component.scss',
})
export class PannelComponent implements OnChanges {
  @Input() entityType!: EntityType;
  @Input() title!: string;

  hasChanges$ = new Subject<boolean>();

  rawItems: Entity[] = [];
  sessionItems: SessionItem[] = [];
  items: Entity[] = [];

  selected$ = this.hasChanges$.pipe(
    map(() =>
      this.entityService
        .loadFromSession(this.entityType)
        .filter((item: Entity) => !item.checked),
    ),
    map((items) => (items.length != 1 ? null : items[0])),
  );

  constructor(private entityService: EntityService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['entityType']) {
      const entityType = changes['entityType'].currentValue;
      const sessionItems = this.fetchItemsFromSession();

      this.entityService.load(entityType).subscribe((rawItems) => {
        this.rawItems = rawItems;
        this.items = this.buildItemsList(rawItems, sessionItems);

        this.hasChanges$.next(true);
      });
    }
  }

  onClickItem() {
    this.hasChanges$.next(true);
  }

  nameFromKey(key: string) {
    return this.rawItems.find((item) => item.key === key)?.name;
  }

  private fetchItemsFromSession(): SessionItem[] {
    return this.entityService.loadFromSession(this.entityType);
  }

  private buildItemsList(
    rawItems: Entity[],
    sessionItems: SessionItem[],
  ): Entity[] {
    return rawItems.map((rawItem) => {
      const sessionItem = sessionItems.find(
        (sessionItem: SessionItem) => sessionItem.key === rawItem.key,
      );
      const { key, name } = rawItem;

      return { key, name, checked: sessionItem?.checked || false };
    });
  }
}
