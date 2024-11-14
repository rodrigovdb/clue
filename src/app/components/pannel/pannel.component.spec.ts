import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelComponent } from './pannel.component';

describe('PannelComponent', () => {
  let component: PannelComponent;
  let fixture: ComponentFixture<PannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
