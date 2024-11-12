import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { Entity } from 'src/app/components/guess/guess.component';
import { EntityRowComponent } from "../entity-row/entity-row.component";
import { EntityService, EntityType } from 'src/app/services/entity.service';
import { BehaviorSubject, combineLatest, filter, fromEvent, map } from 'rxjs';
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
  @Input() set entityType(value: EntityType) {
    this.entityType$.next(value);
  }
  @Input() title!: string;

  entityType$ = new BehaviorSubject<EntityType | null>(null);
  rawItems$ = new BehaviorSubject<Entity[]>([]);
  sessionItems$ = new BehaviorSubject<SessionItem[]>([]);

  items$ = combineLatest([this.rawItems$, this.sessionItems$]).pipe(
    map(([rawItems, sessionItems]) => this.buildItemsList(rawItems, sessionItems))
  );

  selected$ = this.items$.pipe(
    map(items => items.filter(item => !item.checked)),
    map(items => {
      debugger
    })
  );

  constructor(
    private sessionService: SessionService,
    private entityService: EntityService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['entityType']) {
      this.entityService.load(changes['entityType'].currentValue).subscribe(items => this.rawItems$.next(items));
      this.sessionService.watch(changes['entityType'].currentValue).subscribe(items => this.sessionItems$.next(items));
    }
  }

  private buildItemsList(rawItems: Entity[], sessionItems: SessionItem[]): Entity[] {
    return rawItems.map((rawItem) => {
      const sessionItem = sessionItems.find((sessionItem: any) => sessionItem.key === rawItem.key);
      const { checked, ...value } = rawItem

      return {...value, checked: sessionItem?.checked || false }
    })
  }
}
