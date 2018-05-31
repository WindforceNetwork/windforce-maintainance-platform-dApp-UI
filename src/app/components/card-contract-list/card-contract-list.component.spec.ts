import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContractListComponent } from './card-contract-list.component';

describe('CardContractListComponent', () => {
  let component: CardContractListComponent;
  let fixture: ComponentFixture<CardContractListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardContractListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
