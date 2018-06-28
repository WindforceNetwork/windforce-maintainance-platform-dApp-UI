import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeCardComponent } from './composite-card.component';

describe('CompositeCardComponent', () => {
  let component: CompositeCardComponent;
  let fixture: ComponentFixture<CompositeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
