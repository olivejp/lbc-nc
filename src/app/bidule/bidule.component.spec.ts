import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiduleComponent } from './bidule.component';

describe('BiduleComponent', () => {
  let component: BiduleComponent;
  let fixture: ComponentFixture<BiduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
