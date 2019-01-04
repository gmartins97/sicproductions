import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrdersInfoComponent } from './show-orders-info.component';

describe('ShowOrdersInfoComponent', () => {
  let component: ShowOrdersInfoComponent;
  let fixture: ComponentFixture<ShowOrdersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrdersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrdersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
