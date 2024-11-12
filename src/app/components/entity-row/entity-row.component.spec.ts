import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRowComponent } from './entity-row.component';

describe('EntityRowComponent', () => {
  let component: EntityRowComponent;
  let fixture: ComponentFixture<EntityRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
