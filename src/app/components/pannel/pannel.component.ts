import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { Entity } from 'src/app/components/guess/guess.component';
import { EntityRowComponent } from "../entity-row/entity-row.component";
import { EntityService, EntityType } from 'src/app/services/entity.service';
import { BehaviorSubject, combineLatest, filter, fromEvent, map, Observable, Subject, tap } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

interface SessionItem {
  key: string;
  checked: boolean;
}

@Component({
  selector: 'app-pannel',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    TranslateModule,
    EntityRowComponent
],
  templateUrl: './pannel.component.html',
  styleUrl: './pannel.component.scss'
})
export class PannelComponent implements OnChanges {
  @Input() entityType!: EntityType;
  @Input() title!: string;

  hasChanges$ = new Subject<boolean>();

  rawItems: Entity[] = [];
  sessionItems: SessionItem[] = [];
  items: Entity[] = [];

  selected$ = this.hasChanges$.pipe(
    map(() => this.sessionService.get(this.entityType).filter((item: Entity) => !item.checked)),
    map(items => items.length != 1 ? null : items[0])
  )

  constructor(
    private sessionService: SessionService,
    private entityService: EntityService
  ) {}

  // TODO: FIX THIS MESS
  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['entityType']) {
      const entityType = changes['entityType'].currentValue;

      this.sessionService.watch(entityType).subscribe(sessionItems => {
        this.sessionItems = sessionItems;

        this.entityService.load(entityType).subscribe(rawItems => {
          this.rawItems = rawItems;

          this.items = this.buildItemsList(this.rawItems, this.sessionItems);
        });
      });
    }
  }

  onClickItem($event: any) {
    this.hasChanges$.next(true);
  }

  nameFromKey(key: string) {
    return this.rawItems.find(item => item.key === key)?.name;
  }

  private buildItemsList(rawItems: Entity[], sessionItems: SessionItem[]): Entity[] {
    return rawItems.map((rawItem) => {
      const sessionItem = sessionItems.find((sessionItem: any) => sessionItem.key === rawItem.key);
      const { checked, ...value } = rawItem

      return {...value, checked: sessionItem?.checked || false }
    })
  }
}
