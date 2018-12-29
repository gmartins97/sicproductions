import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductInfoComponent } from './show-product-info.component';

describe('ShowProductInfoComponent', () => {
  let component: ShowProductInfoComponent;
  let fixture: ComponentFixture<ShowProductInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProductInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
