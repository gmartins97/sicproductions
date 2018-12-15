import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceFinishComponent } from './surface-finish.component';

describe('SurfaceFinishComponent', () => {
  let component: SurfaceFinishComponent;
  let fixture: ComponentFixture<SurfaceFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfaceFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfaceFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
