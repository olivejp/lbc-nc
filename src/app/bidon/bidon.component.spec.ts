import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidonComponent } from './bidon.component';

describe('BidonComponent', () => {
  let component: BidonComponent;
  let fixture: ComponentFixture<BidonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
