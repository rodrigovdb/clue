import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollerDialogComponent } from './dice-roller-dialog.component';

describe('DiceRollerDialogComponent', () => {
  let component: DiceRollerDialogComponent;
  let fixture: ComponentFixture<DiceRollerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [DiceRollerDialogComponent]
});
    fixture = TestBed.createComponent(DiceRollerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
