import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngryBirdsGameComponent } from './angry-birds-game.component';

describe('AngryBirdsGameComponent', () => {
  let component: AngryBirdsGameComponent;
  let fixture: ComponentFixture<AngryBirdsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngryBirdsGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngryBirdsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
