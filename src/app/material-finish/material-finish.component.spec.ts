import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFinishComponent } from './material-finish.component';

describe('MaterialFinishComponent', () => {
  let component: MaterialFinishComponent;
  let fixture: ComponentFixture<MaterialFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
