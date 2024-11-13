import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { Entity } from 'src/app/components/guess/guess.component';
import { EntityService, EntityType } from 'src/app/services/entity.service';

@Component({
  selector: 'app-entity-row',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  templateUrl: './entity-row.component.html',
  styleUrl: './entity-row.component.scss'
})
export class EntityRowComponent {
  @Input() entityType!: EntityType;
  @Input() item!: Entity;
  @Output() clickedItem = new EventEmitter<Entity>();

  constructor(private entityService: EntityService) {}

  onCheckItem(event: MatCheckboxChange) {
    this.item.checked = event.checked;

    this.entityService.toggleItem(this.entityType, this.item);
    this.clickedItem.emit(this.item);
  }
}
